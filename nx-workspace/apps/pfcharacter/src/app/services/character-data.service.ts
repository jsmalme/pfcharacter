/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';
import { Abilities, DexScore } from '../../../../../libs/character-classes/abilities';
import { Character } from '../../../../../libs/character-classes/character';
import { GeneralInfo, SizeEnum } from '../../../../../libs/character-classes/general-info';
import { CombatInfo, ICombatInfo } from '../../../../../libs/character-classes/combat-info';
import { SavingThrows } from '../../../../../libs/character-classes/saving-throws';
import { Skill } from '../../../../../libs/character-classes/skills';
import { CalcTotService } from './calc-tot.service';
import { BehaviorSubject, concatMap, map, mergeMap, Observable, of, tap } from 'rxjs';
import { CharacterService } from './character-http.service';
import { FormGroup } from '@angular/forms';
import { SnackbarService } from './snackbar.service';
import { Weapon } from 'libs/character-classes/weapon';
import { groupEnd } from 'console';
import { computeMsgId } from '@angular/compiler';

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

  get skillList() {
    return this.character.value.skillList;
  }

  tempRollback() {
    this.tempChar = { ...this.character.value };
    this.rollback = { ...this.character.value };
  }
  loadCharacter() {
    this.http.getCharacter().subscribe((data) => {
      console.log('loading character');
      this.character.next(data);
    })
  }

  //ability/saving updaters--------------------------------------
  updateStr(info: Abilities) {
    this.tempRollback();
    this.tempChar.abilities.updateStr(info);
    this.tempChar.combatInfo.updateStr(info);
    this.updateSkillAbilities(info, this.skillList, 'Str', ['Climb', 'Swim']);

    this.character.next(this.tempChar);

    this.http.updateCharacter(this.tempChar).subscribe({
      error: (e) => {
        this.snackBar.openSnackBar(e);
        this.character.next(this.rollback);
      }
    });
  }

  updateDex(info: Abilities) {
    this.tempRollback();
    this.tempChar.abilities.updateDex(info);
    this.tempChar.savingThrows.updateDex(info);
    const dexSkills = ['Acrobatics', 'Disable Device', 'Escape Artist', 'Fly', 'Ride', 'Sleight of Hand', 'Stealth'];
    this.updateSkillAbilities(info, this.tempChar.skillList, 'Dex', dexSkills);

    this.character.next(this.tempChar);

    this.http.updateCharacter(this.tempChar).subscribe({
      error: (e) => {
        this.snackBar.openSnackBar(e);
        this.character.next(this.rollback);
      }
    });
  }

  updateCon(info: Abilities) {
    // this._character.abilities = info;
  }

  updateInt(info: Abilities) {
    // this._character.abilities = info
    // const intSkills = ['Appraise', 'Craft1', 'Craft2', 'Craft3', 'Knowledge (Arcana)', 'Knowledge (Dungeoneering)', 'Knowledge (Engineering)',
    //   'Knowledge (Geography)', 'Knowledge (History)', 'Knowledge (Local)', 'Knowledge (Nature)', 'Knowledge (Nobility)', 'Knowledge (Planes)',
    //   'Knowledge (Religion)', 'Linguistics', 'Spellcraft'];
    // this.updateSkillAbilities(info, this._character.skillList, 'Int', intSkills);
  }

  updateWis(info: Abilities) {
    // this._character.abilities = info;
    // const wisSkills = ['Heal', 'Perception', 'Profession1', 'Profession2', 'Sense Motive', 'Survival'];
    // this.updateSkillAbilities(info, this._character.skillList, 'Wis', wisSkills);
  }

  updateCha(info: Abilities) {
    // this._character.abilities = info;
    // const chaSkills = ['Bluff', 'Diplomacy', 'Disguise', 'Handle Animal', 'Intimidate', 'Perform1', 'Perform2', 'Use Magic Device'];
    // this.updateSkillAbilities(info, this._character.skillList, 'Cha', chaSkills);
  }
  //------------------------------------------------------
  //combat page updates-----------------------------------
  updateCombatInfo(info: CombatInfo) {
    this.tempRollback();
    this.tempChar.combatInfo = Object.assign(info);
    this.tempChar.combatInfo.updateCombatInfoTotals(this.abilities);
    this.character.next(this.tempChar);

    this.http.updateCharacter(this.tempChar).subscribe({
      error: (e) => {
        this.snackBar.openSnackBar(e);
        this.character.next(this.rollback);
      }
    });
  }

  updateWeapons(weapons: Weapon[]) {
    this.tempRollback();
    this.tempChar.combatInfo.weapons = weapons;
    this.character.next(this.tempChar);

    this.http.updateCharacter(this.tempChar).subscribe({
      error: (e) => {
        this.snackBar.openSnackBar(e);
        this.character.next(this.rollback);
      }
    })
  }
  //------------------------------------------------------

  //charater updates ---------------------------------------
  updateGeneralInfo(generalInfo: GeneralInfo) {
    this.tempRollback();
    this.tempChar.generalInfo = generalInfo;
    if (generalInfo.size !== undefined && generalInfo.size !== this.rollback.generalInfo.size) {
      this.tempChar.combatInfo.updateSize(generalInfo.size, this.abilities);
    }
    this.character.next(this.tempChar);

    this.http.updateCharacter(this.tempChar).pipe(
      mergeMap(() => this.http.updateCharacter(this.tempChar))
    ).subscribe({
      error: (e) => {
        this.snackBar.openSnackBar(e);
        this.character.next(this.rollback);
      }
    })
  }

  updateSavingThrows(savingThrows: SavingThrows) {
    // this._character.savingThrows = savingThrows;
  }
  //-----------------------------------------------------------

  //Skill updates --------------------------------------------------
  updateSkillAbilities(abilities: Abilities, skillList: Skill[], ability: string, skillIds: string[]) {
    const updatedSkillList = this.updateSkillAbilityScore(ability, skillIds, skillList, abilities);
    this.tempChar.skillList = this.totService.getSkillsTotals(updatedSkillList, skillIds);
  }

  updateSkills(skillList: Skill[]) {
    // console.log('triggered');
    // this._character.skillList = skillList;
  }
  //----------------------------------------------------------------

  updateSkillAbilityScore(ability: string, skillIds: string[], skillList: Skill[], abilities: Abilities): Skill[] {
    return skillList.map(skill => {
      if (skillIds.some(s => s === skill.id)) {
        switch (ability) {
          case 'Dex':
            skill.abilityMod = abilities.useDexMod || 0;
            break;
          case 'Str':
            skill.abilityMod = abilities.useStrMod || 0;
            break;
          case 'Wis':
            skill.abilityMod = abilities.useWisMod || 0;
            break;
          case 'Int':
            skill.abilityMod = abilities.useIntMod || 0;
            break;
          case 'Cha':
            skill.abilityMod = abilities.useChaMod || 0;
            break;
          case 'Con':
            skill.abilityMod = abilities.useConMod || 0;
            break;
        }
      }
      return skill;
    });

  }
}
