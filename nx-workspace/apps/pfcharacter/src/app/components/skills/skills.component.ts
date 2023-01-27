import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Abilities } from '../../../../../../libs/character-classes/abilities';
import { Skill } from '../../../../../../libs/character-classes/skills';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { maxNumberValidator } from '../../functions/validators';
import { debounceTime } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'nx-workspace-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  animations: [
    trigger('detailExpand', [
        state('collapsed', style({height: '0px', minHeight: '0'})),
        state('expanded', style({height: '*'})),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
],
})


export class SkillsComponent implements OnInit, AfterViewInit {
  skills!: Skill[];   
  abilities!: Abilities; 
  skillsForm!: FormGroup;  

  constructor(private characterService: CharacterService,
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder) {}
         

  nonMobileColumns: string[] = ['favorite', 'classSkill', 'name', 'ability',
  'total', 'abilityMod', 'class', 'ranks', 'racial', 'misc'];
  mobileColumns: string[] = ['favorite', 'classSkill', 'name', 'ability', 'total'];

  displayedColumns: string[] = new Array<string>(); 
  dataSource = new MatTableDataSource<AbstractControl<unknown, unknown>>;

  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(): void {
    this.skills = this.characterService.character.skillList;
    this.abilities = this.characterService.abilities;
    this.skillsForm = this.fb.group({
      skills: this.getSkillsFormArray()
    })
    this.dataSource = new MatTableDataSource((this.skillsForm.get('skills') as FormArray).controls);

    //angular grid bootstrapping thingy
    this.breakpointObserver.observe(['(min-width:768px)'])
    .subscribe((state: BreakpointState) => {
      state.matches ? this.displayedColumns = this.nonMobileColumns : this.displayedColumns = this.mobileColumns;
    });

    this.skillsForm.get('skills')?.valueChanges.pipe(debounceTime(1000)).subscribe(info => {
      console.log(info);
    })
  }

  ngAfterViewInit(){
    this.dataSource.sortingDataAccessor = (data: AbstractControl, sortHeaderId: string) => {
      const value: any = data.value[sortHeaderId];
      return typeof value === 'string' ? value.toLocaleLowerCase() : value;
    }

    this.dataSource.sort = this.sort

    const filterPredicate = this.dataSource.filterPredicate;
    this.dataSource.filterPredicate = (data: AbstractControl, filter) => {
      return filterPredicate.call(this.dataSource, data.value, filter);
    }
  }

  getSkillsFormArray(){
    return this.fb.array(
      this.skills.map(skill => this.fb.group({
        favorite: this.fb.control(skill.favorite),
        classSkill: this.fb.control(skill.classSkill),
        name: this.fb.control(skill.name),
        ability: this.fb.control(skill.abilityName),
        total: this.fb.control(skill.total),
        abilityMod: this.fb.control(skill.abilityMod),
        ranks: this.fb.control(skill.ranks, maxNumberValidator()),
        racial: this.fb.control(skill.racial, maxNumberValidator()),
        misc: this.fb.control(skill.misc, maxNumberValidator())
      }))
    )
  }
}
