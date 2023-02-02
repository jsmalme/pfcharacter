/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { Abilities } from 'libs/character-classes/abilities';
import { CombatInfo } from 'libs/character-classes/combat-info';
import { Skill } from 'libs/character-classes/skills';
import { strUnToNum } from '../functions/methods';

@Injectable({
  providedIn: 'root'
})
export class CalcTotService {

  constructor() { }

  //COMBAT STATS ---------------------------------------------------------------------
  getCmbTotal(combatInfo: CombatInfo, abilities: Abilities): number{
    return strUnToNum(combatInfo.bab) + 
    strUnToNum(abilities.useStrMod) + 
    strUnToNum(combatInfo.cmSizeMod) + 
    strUnToNum(combatInfo.cmbMiscMod);
  }

  getCmdTotal(combatInfo: CombatInfo, abilities: Abilities): number{
    return strUnToNum(combatInfo.bab) + 
    strUnToNum(abilities.useStrMod) + 
    strUnToNum(abilities.useDexMod) + 
    strUnToNum(combatInfo.cmSizeMod) + 
    strUnToNum(combatInfo.cmdMiscMod) + 10;
  }

  getInitiativeTotal(combatInfo: CombatInfo, abilities: Abilities): number{
    return strUnToNum(abilities.useDexMod) +  
    strUnToNum(combatInfo.initiativeMiscMod);
  }

  getAcTotal(combatInfo: CombatInfo, abilities: Abilities): number{
    return strUnToNum(combatInfo.acArmorMod) + 
    strUnToNum(combatInfo.acShieldMod) + 
    strUnToNum(abilities.useDexMod) + 
    strUnToNum(combatInfo.acSizeMod) + 
    strUnToNum(combatInfo.acNaturalArmorMod) +
    strUnToNum(combatInfo.acDeflectMod) + 
    strUnToNum(combatInfo.acMiscMod) + 10;
  }

  getAcTouchTotal(combatInfo: CombatInfo, abilities: Abilities): number{
    return strUnToNum(abilities.useDexMod) + 
    strUnToNum(combatInfo.acDeflectMod) + 
    strUnToNum(combatInfo.acSizeMod) + 
    strUnToNum(combatInfo.acMiscMod) + 10;
  }

  getAcFlatTotal(combatInfo: CombatInfo): number{
    return strUnToNum(combatInfo.acArmorMod) + 
    strUnToNum(combatInfo.acShieldMod) + 
    strUnToNum(combatInfo.acSizeMod) + 
    strUnToNum(combatInfo.acNaturalArmorMod) +
    strUnToNum(combatInfo.acDeflectMod) + 
    strUnToNum(combatInfo.acMiscMod) + 10;
  }
//------------------------------------------------------------------------------

//SKILLS------------------------------------------------------------------------
  getSkillTotal(skill: Skill): number{
    return strUnToNum(skill?.abilityMod) + 
    strUnToNum(skill?.ranks) + 
    strUnToNum(skill?.racial) + 
    strUnToNum(skill?.misc) + 
    (skill?.classSkill ? 3 : 0);
  }

  getSkillsTotals(skillList: Skill[], skillIds: string[] = []): Skill[]{
    if(skillIds.length === 0){
      return skillList.map(skill => {
        skill.total = this.getSkillTotal(skill);
        return skill
      });
    }
    else{
    return skillList.map(skill => {
      if(skillIds.some(s => s === skill.id)){
        skill.total = this.getSkillTotal(skill);
      }
      return skill;
    });
  }
  }
}
