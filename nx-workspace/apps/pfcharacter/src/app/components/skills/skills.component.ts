/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CharacterDataService } from '../../services/character-data.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Abilities } from '../../../../../../libs/character-classes/abilities';
import { Skill } from '../../../../../../libs/character-classes/skills';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { maxNumberValidator } from '../../functions/validators';
import { debounceTime, distinctUntilChanged, first, Observable, take } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
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
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class SkillsComponent implements OnInit, AfterViewInit {
  skillsForm: FormGroup;
  skills: Skill[];
  character$: Observable<Character>;
  count = 0;

  constructor(private store: CharacterDataService,
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private totService: CalcTotService) { }


  nonMobileColumns: string[] = ['favorite', 'classSkill', 'name', 'abilityName',
    'total', 'abilityMod', 'class', 'ranks', 'racial', 'misc'];
  mobileColumns: string[] = ['favorite', 'classSkill', 'name', 'abilityName', 'total'];
  displayedColumns: string[] = new Array<string>();
  dataSource = new MatTableDataSource<AbstractControl<unknown, unknown>>;

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.character$ = this.store.characterUpdate$.pipe(take(1));
    this.character$.pipe(first()).subscribe((char: Character) => {
      this.skillsForm = this.fb.group({
        skills: this.getSkillsFormArray(char.skillList)
      });
      this.skillsForm.get('skills')?.valueChanges.pipe(distinctUntilChanged(), debounceTime(250)).subscribe(info => {
        if (!this.skillsForm?.valid) {
          return;
        }
        this.skills = this.totService.getSkillsTotals(info);
        this.skillsForm.get('skills')?.setValue(this.skills, { emitEvent: false });
        this.dataSource.data = this.skillsArray.controls;
        this.store.updateSkills(this.skills);
      });
    });

    //angular grid bootstrapping thingy
    this.breakpointObserver.observe(['(min-width:768px)'])
      .subscribe((state: BreakpointState) => {
        state.matches ? this.displayedColumns = this.nonMobileColumns : this.displayedColumns = this.mobileColumns;
      });
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.skillsArray.controls);
    this.dataSource.sortingDataAccessor = (data: AbstractControl, sortHeaderId: string) => {
      const value: any = data.value[sortHeaderId];
      return typeof value === 'string' ? value.toLocaleLowerCase() : value;
    }
    this.dataSource.sort = this.sort;

    const filterPredicate = this.dataSource.filterPredicate;
    this.dataSource.filterPredicate = (data: AbstractControl, filter) => {
      return filterPredicate.call(this.dataSource, data.value, filter);
    }
  }

  get skillsArray() {
    return this.skillsForm.get('skills') as FormArray;
  }


  getSkillsFormArray(skills: Skill[]) {
    return this.fb.array(
      skills.map(skill => this.fb.group({
        id: this.fb.control(skill.id),
        favorite: this.fb.control(skill.favorite),
        classSkill: this.fb.control(skill.classSkill),
        name: this.fb.control(skill.name),
        abilityName: this.fb.control(skill.abilityName),
        total: this.fb.control(skill.total),
        abilityMod: this.fb.control(skill.abilityMod),
        ranks: this.fb.control(skill.ranks, maxNumberValidator()),
        racial: this.fb.control(skill.racial, maxNumberValidator()),
        misc: this.fb.control(skill.misc, maxNumberValidator())
      }))
    )
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
      favorite: !form.value.favorite
    });

    this.skills.map(skill => {
      if (skill.id === skillId) {
        skill.favorite == !form?.value.favorite;
      }
    });
    this.store.updateSkills(this.skills);
  }

}
