/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';
import { Abilities, Ability } from '../../../../../libs/character-classes/abilities';
import { Character } from '../../../../../libs/character-classes/character';
import { GeneralInfo, SizeEnum } from '../../../../../libs/character-classes/general-info';
import { CombatInfo } from '../../../../../libs/character-classes/combat-info';
import { Throw } from '../../../../../libs/character-classes/saving-throws';
import { Skill } from '../../../../../libs/character-classes/skills';
import { CalcTotService } from './calc-tot.service';
import { BehaviorSubject } from 'rxjs';
import { CharacterService } from './character-http.service';
import { SnackbarService } from './snackbar.service';
import { Weapon } from 'libs/character-classes/weapon';
import * as _ from "lodash"; 
import { WeightCapacity } from 'libs/character-classes/equipment';

@Injectable({
  providedIn: 'root'
})
export class CharacterDataService {

  constructor(
    private totService: CalcTotService,
    private http: CharacterService,
    private snackBar: SnackbarService) { }

  private character = new BehaviorSubject<Character>(new Character());
  characterUpdate$ = this.character.asObservable();
  private tempChar: Character;
  private rollback: Character;

  get combatInfo() {
    return this.character.value.combatInfo;
  }
  get abilities() {
    return this.character.value.abilities;
  }

  get generalInfo(){
    return this.character.value.generalInfo;
  }

  get skillList() {
    return this.character.value.skillList;
  }

  tempRollback() {
    this.tempChar = _.cloneDeep(this.character.value);
    this.rollback = _.cloneDeep(this.character.value);
  }
  loadCharacter() {
    this.http.getCharacter().subscribe((data) => {
      this.character.next(data);
    })
  }

  //ability/saving updaters--------------------------------------
  updateStr(info: Ability) {
    this.tempRollback();
    this.tempChar.abilities.str.update(info);
    this.tempChar.combatInfo.updateStr(this.tempChar.abilities);
    this.tempChar.equipment.weightCaps.updateCarryCapacities(info, this.tempChar.generalInfo.size ?? SizeEnum.medium);
    this.updateSkillAbilities(this.tempChar.abilities, this.skillList, 'Str', ['Climb', 'Swim']);
    this.character.next(this.tempChar);

    // this.http.updateCharacter(this.tempChar).subscribe({
    //   error: (e) => {
    //     this.snackBar.openSnackBar(e);
    //     this.character.next(this.rollback);
    //   }
    // });
  }

  updateDex(info: Ability) {
    this.tempRollback();
    this.tempChar.abilities.dex.update(info);
    console.log(this.tempChar);
    this.tempChar.savingThrows.ref.updateMod(this.tempChar.abilities.dex.useMod);
    const dexSkills = ['Acrobatics', 'Disable Device', 'Escape Artist', 'Fly', 'Ride', 'Sleight of Hand', 'Stealth'];
    this.updateSkillAbilities(this.tempChar.abilities, this.tempChar.skillList, 'Dex', dexSkills);

    this.character.next(this.tempChar);

    // this.http.updateCharacter(this.tempChar).subscribe({
    //   error: (e) => {
    //     this.snackBar.openSnackBar(e);
    //     this.character.next(this.rollback);
    //   }
    // });
  }

  updateCon(info: Ability) {
    this.tempRollback();
    this.tempChar.abilities.con.update(info);
    this.tempChar.savingThrows.for.updateMod(this.tempChar.abilities.con.useMod);

    this.character.next(this.tempChar);

    // this.http.updateCharacter(this.tempChar).subscribe({
    //   error: (e) => {
    //     this.snackBar.openSnackBar(e);
    //     this.character.next(this.rollback);
    //   }
    // });
  }

  updateInt(info: Ability) {
    this.tempRollback();
    this.tempChar.abilities.int.update(info);
    const intSkills = ['Appraise', 'Craft1', 'Craft2', 'Craft3', 'Knowledge (Arcana)', 'Knowledge (Dungeoneering)', 'Knowledge (Engineering)',
      'Knowledge (Geography)', 'Knowledge (History)', 'Knowledge (Local)', 'Knowledge (Nature)', 'Knowledge (Nobility)', 'Knowledge (Planes)',
      'Knowledge (Religion)', 'Linguistics', 'Spellcraft'];
    this.updateSkillAbilities(this.tempChar.abilities, this.tempChar.skillList, 'Int', intSkills);

    this.character.next(this.tempChar);

    // this.http.updateCharacter(this.tempChar).subscribe({
    //   error: (e) => {
    //     this.snackBar.openSnackBar(e);
    //     this.character.next(this.rollback);
    //   }
    // });
  }

  updateWis(info: Ability) {
    this.tempRollback();
    this.tempChar.abilities.wis.update(info);
    this.tempChar.savingThrows.will.updateMod(this.tempChar.abilities.wis.useMod);

    const wisSkills = ['Heal', 'Perception', 'Profession1', 'Profession2', 'Sense Motive', 'Survival'];
    this.updateSkillAbilities(this.tempChar.abilities, this.tempChar.skillList, 'Wis', wisSkills);

    this.character.next(this.tempChar);

    // this.http.updateCharacter(this.tempChar).subscribe({
    //   error: (e) => {
    //     this.snackBar.openSnackBar(e);
    //     this.character.next(this.rollback);
    //   }
    // });
  }

  updateCha(info: Ability) {
    this.tempRollback();
    this.tempChar.abilities.cha.update(info);
    const chaSkills = ['Bluff', 'Diplomacy', 'Disguise', 'Handle Animal', 'Intimidate', 'Perform1', 'Perform2', 'Use Magic Device'];
    this.updateSkillAbilities(this.tempChar.abilities, this.tempChar.skillList, 'Cha', chaSkills);

    this.character.next(this.tempChar);

    // this.http.updateCharacter(this.tempChar).subscribe({
    //   error: (e) => {
    //     this.snackBar.openSnackBar(e);
    //     this.character.next(this.rollback);
    //   }
    // });
  }
  //------------------------------------------------------
  //combat page updates-----------------------------------
  updateCombatInfo(info: CombatInfo) {
    this.tempRollback();
    this.tempChar.combatInfo = Object.assign(this.tempChar.combatInfo, info);
    this.tempChar.combatInfo.updateCombatInfoTotals(this.abilities);
    this.character.next(this.tempChar);

    // this.http.updateCharacter(this.tempChar).subscribe({
    //   error: (e) => {
    //     this.snackBar.openSnackBar(e);
    //     this.character.next(this.rollback);
    //   }
    // });
  }

  updateWeapons(weapons: Weapon[]) {
    this.tempRollback();
    this.tempChar.combatInfo.weapons = weapons;
    this.character.next(this.tempChar);

    // this.http.updateCharacter(this.tempChar).subscribe({
    //   error: (e) => {
    //     this.snackBar.openSnackBar(e);
    //     this.character.next(this.rollback);
    //   }
    // });
  }
  //------------------------------------------------------

  //charater updates ---------------------------------------
  updateGeneralInfo(generalInfo: GeneralInfo) {
    this.tempRollback();
    this.tempChar.generalInfo = generalInfo;
    if (generalInfo.size !== undefined && generalInfo.size !== this.rollback.generalInfo.size) {
      this.tempChar.combatInfo.updateSize(generalInfo.size, this.abilities);
      this.tempChar.equipment.weightCaps.updateCarryCapacities(this.tempChar.abilities.str, generalInfo.size);
    }
    this.character.next(this.tempChar);

    // this.http.updateCharacter(this.tempChar).pipe(
    //   tap(() => {
    //     this.http.updateCharacter(this.tempChar);
    //   }),
    //   concatMap(() => {
    //     if(generalInfo.size !== undefined &&  generalInfo.size !== this.generalInfo.size){
    //       return this.http.updateCharacter(this.tempChar);
    //     }
    //     return of({})
    //   })
    // ).subscribe({
    //   error: (e) => {
    //     this.snackBar.openSnackBar(e);
    //     this.character.next(this.rollback);
    //   }
    // });    
  }

  updateSavingThrows(info: Throw, type: string) {
    console.log(info);
    this.tempRollback();
    switch(type){
      case 'FOR':
        this.tempChar.savingThrows.for.update(info);
        break;
      case 'REF': 
        this.tempChar.savingThrows.ref.update(info);
        break;
      case 'WILL': 
        this.tempChar.savingThrows.will.update(info);
        break;
    }
    this.character.next(this.tempChar);

    // this.http.updateCharacter(this.tempChar).subscribe({
    //   error: (e) => {
    //     this.snackBar.openSnackBar(e);
    //     this.character.next(this.rollback);
    //   }
    // });
  }
  //-----------------------------------------------------------

  //Skill updates --------------------------------------------------
  updateSkillAbilities(abilities: Abilities, skillList: Skill[], ability: string, skillIds: string[]) {
    const updatedSkillList = this.updateSkillAbilityScore(ability, skillIds, skillList, abilities);
    this.tempChar.skillList = this.totService.getSkillsTotals(updatedSkillList, skillIds);
  }

  updateSkills(skills: Skill[]) {
    this.tempRollback();
    this.tempChar.skillList = skills;

    this.character.next(this.tempChar);

    // this.http.updateCharacter(this.tempChar).subscribe({
    //   error: (e) => {
    //     this.snackBar.openSnackBar(e);
    //     this.character.next(this.rollback);
    //   }
    // });
  }
  //----------------------------------------------------------------

  updateSkillAbilityScore(ability: string, skillIds: string[], skillList: Skill[], abilities: Abilities): Skill[] {
    return skillList.map(skill => {
      if (skillIds.some(s => s === skill.id)) {
        switch (ability) {
          case 'Dex':
            skill.abilityMod = abilities.dex.useMod || 0;
            break;
          case 'Str':
            skill.abilityMod = abilities.str.useMod || 0;
            break;
          case 'Wis':
            skill.abilityMod = abilities.wis.useMod || 0;
            break;
          case 'Int':
            skill.abilityMod = abilities.int.useMod || 0;
            break;
          case 'Cha':
            skill.abilityMod = abilities.cha.useMod || 0;
            break;
          case 'Con':
            skill.abilityMod = abilities.con.useMod || 0;
            break;
        }
      }
      return skill;
    });

  }
}
