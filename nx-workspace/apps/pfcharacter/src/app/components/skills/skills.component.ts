/* eslint-disable @nx/enforce-module-boundaries */
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CharacterDataService } from '../../services/character-data.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Skill } from '../../../../../../libs/character-classes/skills';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { maxNumberValidator } from '../../functions/validators';
import { debounceTime, distinctUntilChanged, first, Observable } from 'rxjs';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { CalcTotService } from '../../services/calc-tot.service';
import { Character } from 'libs/character-classes/character';

@Component({
  selector: 'nx-workspace-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded, void', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class SkillsComponent implements OnInit, AfterViewInit {
  skillsForm: FormGroup;
  skills: Skill[];
  character$: Observable<Character>;
  count = 0;
  isMediumScreen = false;

  constructor(
    private store: CharacterDataService,
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private totService: CalcTotService
  ) {}

  largeColumns: string[] = [
    'favorite',
    'class_skill',
    'name',
    'ability_name',
    'total',
    'ability_mod',
    'class',
    'ranks',
    'racial',
    'misc',
  ];
  mediumColumns: string[] = [
    'favorite',
    'class_skill',
    'name',
    'ability_name',
    'total',
    'ability_mod',
    'class',
  ];
  mobileColumns: string[] = [
    'favorite',
    'class_skill',
    'name',
    'ability_name',
    'total',
  ];
  displayedColumns: string[] = new Array<string>();
  dataSource = new MatTableDataSource<AbstractControl<unknown, unknown>>();

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.character$ = this.store.characterUpdate$;
    this.character$.pipe(first()).subscribe((char: Character) => {
      this.skillsForm = this.fb.group({
        skills: this.getSkillsFormArray(char.skills),
      });

      this.skillsForm
        .get('skills')
        ?.valueChanges.pipe(distinctUntilChanged(), debounceTime(250))
        .subscribe((info) => {
          if (!this.skillsForm?.valid) {
            return;
          }
          this.skills = this.totService.getSkillsTotals(info);
          this.skillsForm
            .get('skills')
            ?.setValue(this.skills, { emitEvent: false });
          this.dataSource.data = this.skillsArray.controls;
          this.store.updateSkills(this.skills);
        });
    });

    //angular grid bootstrapping thingy
    this.breakpointObserver
      .observe(['(min-width:993px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMediumScreen = false;
          this.displayedColumns = this.largeColumns;
        }
      });

    this.breakpointObserver
      .observe(['(min-width:768px) and (max-width:992px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMediumScreen = true;
          this.displayedColumns = this.mediumColumns;
        }
      });

    this.breakpointObserver
      .observe(['(max-width:767px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMediumScreen = false;
          this.displayedColumns = this.mobileColumns;
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.skillsArray.controls);
    this.dataSource.sortingDataAccessor = (
      data: AbstractControl,
      sortHeaderId: string
    ) => {
      const value: any = data.value[sortHeaderId];
      return typeof value === 'string' ? value.toLocaleLowerCase() : value;
    };
    this.dataSource.sort = this.sort;

    const filterPredicate = this.dataSource.filterPredicate;
    this.dataSource.filterPredicate = (data: AbstractControl, filter) => {
      return filterPredicate.call(this.dataSource, data.value, filter);
    };
  }

  get skillsArray() {
    return this.skillsForm.get('skills') as FormArray;
  }

  getSkillsFormArray(skills: Skill[]) {
    return this.fb.array(
      skills.map((skill) =>
        this.fb.group({
          id: this.fb.control(skill.id),
          favorite: this.fb.control(skill.favorite),
          class_skill: this.fb.control(skill.class_skill),
          name: this.fb.control(skill.name),
          ability_name: this.fb.control(skill.ability_name),
          total: this.fb.control(skill.total),
          ability_mod: this.fb.control(skill.ability_mod),
          ranks: this.fb.control(skill.ranks, maxNumberValidator()),
          racial: this.fb.control(skill.racial, maxNumberValidator()),
          misc: this.fb.control(skill.misc, maxNumberValidator()),
          trained_skill: this.fb.control(skill.trained_skill),
          check_penalty: this.fb.control(skill.check_penalty),
        })
      )
    );
  }

  toggleFavorite(skillId: string) {
    const form = this.skillsArray.controls.find((skill: AbstractControl) => {
      const skillFormGroup = skill as FormGroup;
      if (skillFormGroup.controls['id'].value === skillId) {
        return skill;
      }
      return null;
    });

    form?.patchValue({
      favorite: !form.value.favorite,
    });

    this.skills.map((skill) => {
      if (skill.id === skillId) {
        skill.favorite == !form?.value.favorite;
      }
    });
    this.store.updateSkills(this.skills);
  }
}
