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
    return strUnToNum(skill.ability_mod) +
      strUnToNum(skill.ranks) +
      strUnToNum(skill.racial) +
      strUnToNum(skill.misc) +
      strUnToNum(skill.check_penalty) +
      (skill.class_skill ? 3 : 0);
  }

  getSkillsTotals(skills: Skill[], skillIds: string[] = []): Skill[] {
    if (skillIds.length === 0) {
      return skills.map(skill => {
        skill.total = this.getSkillTotal(skill);
        return skill
      });
    }
    else {
      return skills.map(skill => {
        if (skillIds.some(s => s === skill.id)) {
          skill.total = this.getSkillTotal(skill);
        }
        return skill;
      });
    }
  }

  //EQUIPMENT------------------------------------------------------------------------
  getTotalWeight(gear: Gear[], weapons: Weapon[], ac_items: AcItem[]): number {
    let totalWeight = 0;
    gear.forEach(g => totalWeight += (g.weight ?? 0) * (g.quantity ?? 0));
    weapons.forEach(w => totalWeight += w.weight ?? 0);
    ac_items.forEach(a => totalWeight += a.weight ?? 0);
    return totalWeight;
  }


  calculateEncumbrance(info: IWeightCapacity, totalWeight: number) {
    if (totalWeight && info) {
      if (totalWeight <= (info.light_load ?? 0)) {
        return burdenEnum.light;
      }
      else if (totalWeight >= (info.med_load?.min || 0) && totalWeight <= (info.med_load?.max || 0)) {
        return burdenEnum.medium;
      }
      else if (totalWeight >= (info.heavy_load?.min || 0)) {
        return burdenEnum.heavy;
      }
    }
    return burdenEnum.light;
  }

  //-------------------------------------------------------------------------------
  //Ability Mod Background Color Calc
  calculateModColor(modNum: number | null) {
    if (modNum === null) {
      return "808080";
    }
    if (modNum < 0) {
      return "#bc1f26";
    }
    else if (modNum === 0) {
      return "#FF2400";
    }
    else if (modNum === 1) {
      return "#ff8c00";
    }
    else if (modNum === 2) {
      return "#FFC000";
    }
    else if (modNum === 3) {
      return "#99C96A";
    }
    else if (modNum === 4) {
      return "#60AA17";
    }
    else if (modNum >= 5) {
      return "#0f9246";
    }
    else {
      return "#808080";
    }
  }
}
