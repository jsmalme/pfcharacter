/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { Abilities } from 'libs/character-classes/abilities';
import { CombatInfo } from 'libs/character-classes/combat-info';
import { Skill } from 'libs/character-classes/skills';
import { combineLatestInit } from 'rxjs/internal/observable/combineLatest';
import { strUnToNum } from '../functions/methods';

@Injectable({
  providedIn: 'root'
})
export class CalcTotService {

  constructor() { }
  //SKILLS------------------------------------------------------------------------
  getSkillTotal(skill: Skill): number {
    return strUnToNum(skill.abilityMod) +
      strUnToNum(skill.ranks) +
      strUnToNum(skill.racial) +
      strUnToNum(skill.misc) +
      (skill.classSkill ? 3 : 0);
  }

  getSkillsTotals(skillList: Skill[], skillIds: string[] = []): Skill[] {
    if (skillIds.length === 0) {
      return skillList.map(skill => {
        skill.total = this.getSkillTotal(skill);
        return skill
      });
    }
    else {
      return skillList.map(skill => {
        if (skillIds.some(s => s === skill.id)) {
          skill.total = this.getSkillTotal(skill);
        }
        return skill;
      });
    }
  }
}
