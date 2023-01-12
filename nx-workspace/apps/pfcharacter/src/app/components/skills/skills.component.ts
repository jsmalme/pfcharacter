import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Abilities } from '../../../../../../libs/character-classes/abilities';
import { Skill } from '../../../../../../libs/character-classes/skills';

@Component({
  selector: 'nx-workspace-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  constructor(private characterService: CharacterService,
    private breakpointObserver: BreakpointObserver) {}
  
  skills!: Skill[];   
  abilities!: Abilities;            

  nonMobileColumns: string[] = ['favorite', 'classSkill', 'name', 'ability',
  'total', 'abilityMod', 'ranks', 'class', 'racial', 'misc'];
  mobileColumns: string[] = ['favorite', 'classSkill', 'name', 'ability', 'total'];

  displayedColumns: string[] = new Array<string>(); 
  dataSource: Skill[] = new Array<Skill>();
  
  ngOnInit(): void {
    this.skills = this.characterService.character.skillList;
    this.abilities = this.characterService.abilities;
    this.dataSource = this.skills;

    //angular grid bootstrapping thingy
    this.breakpointObserver.observe(['(min-width:768px)'])
    .subscribe((state: BreakpointState) => {
      state.matches ? this.displayedColumns = this.nonMobileColumns : this.displayedColumns = this.mobileColumns;
    });

  }
}
