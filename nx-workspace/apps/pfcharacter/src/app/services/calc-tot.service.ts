/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { Skill } from 'libs/character-classes/skills';
import { strUnToNum } from '../functions/methods';
import { AcItem, Gear, IWeightCapacity, burdenEnum } from 'libs/character-classes/equipment';
import { Weapon } from 'libs/character-classes/weapon';

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
      strUnToNum(skill.checkPenalty) +
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

  //EQUIPMENT------------------------------------------------------------------------
  getTotalWeight(gear: Gear[], weapons: Weapon[], acItems: AcItem[]): number {
    let totalWeight = 0;
    gear.forEach(g => totalWeight += (g.weight ?? 0) * (g.quantity ?? 0));
    weapons.forEach(w => totalWeight += w.weight ?? 0);
    acItems.forEach(a => totalWeight += a.weight ?? 0);
    return totalWeight;
  }


  calculateEncumbrance(info: IWeightCapacity, totalWeight: number) {
    if (totalWeight && info) {
      if (totalWeight <= (info.lightLoad ?? 0)) {
        return burdenEnum.light;
      }
      else if (totalWeight >= (info.medLoad?.min || 0) && totalWeight <= (info.medLoad?.max || 0)) {
        return burdenEnum.medium;
      }
      else if (totalWeight >= (info.heavyLoad?.min || 0)) {
        return burdenEnum.heavy;
      }
    }
    return burdenEnum.light;
  }
}
