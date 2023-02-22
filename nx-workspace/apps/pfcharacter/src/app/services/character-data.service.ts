/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';
import { Abilities, DexScore } from '../../../../../libs/character-classes/abilities';
import { Character } from '../../../../../libs/character-classes/character';
import { GeneralInfo, SizeEnum } from '../../../../../libs/character-classes/general-info';
import { CombatInfo } from '../../../../../libs/character-classes/combat-info';
import { SavingThrows } from '../../../../../libs/character-classes/saving-throws';
import { Skill } from '../../../../../libs/character-classes/skills';
import { CalcTotService } from './calc-tot.service';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { CharacterService } from './character-http.service';
import { FormGroup } from '@angular/forms';
import { SnackbarService } from './snackbar.service';
import { Weapon } from 'libs/character-classes/weapon';

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

  tempRollback() {
    const char = { ...this.character.value };
    this.tempChar = char;
    this.rollback = char;
  }
  loadCharacter() {
    this.http.getCharacter().subscribe((data) => {
      console.log('loading character');
      this.character.next(data);
    })
  }

  //ability/saving updaters--------------------------------------
  updateStr(info: Abilities) {
    // this._character.abilities = info;
    // this._character.combatInfo.cmbTotal = this.totService.getCmbTotal(this._character.combatInfo, info);
    // this._character.combatInfo.cmdTotal = this.totService.getCmdTotal(this._character.combatInfo, info);
    // this.updateSkillAbilities(info, this._character.skillList, 'Str', ['Climb', 'Swim']);
  }

  updateDex(info: Abilities) {
    // this._character.abilities = info;
    // this._character.combatInfo.initiativeTotal = this.totService.getInitiativeTotal(this._character.combatInfo, info);
    // this._character.combatInfo.cmdTotal = this.totService.getCmdTotal(this._character.combatInfo, info);
    // this._character.combatInfo.acTotal = this.totService.getAcTotal(this._character.combatInfo, info);
    // this._character.combatInfo.acTouch = this.totService.getAcTouchTotal(this._character.combatInfo, info);
    // const dexSkills = ['Acrobatics', 'Disable Device', 'Escape Artist', 'Fly', 'Ride', 'Sleight of Hand', 'Stealth'];
    // this.updateSkillAbilities(info, this._character.skillList, 'Dex', dexSkills);
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
    this.tempChar.combatInfo = { ...this.tempChar.combatInfo, ...info };
    this.tempChar.combatInfo = this.totService.getCombatInfoTotals(this.tempChar.combatInfo, this.abilities);
    this.character.next(this.tempChar);

    this.http.updateCharacter(this.tempChar).subscribe({
      error: (e) => {
        this.snackBar.openSnackBar(e);
        this.character.next(this.rollback);
      }
    })
  }

  updateWeapons(weapons: Weapon[]) {
    this.tempRollback();
    this.tempChar.combatInfo.weapons = weapons;
    console.log(this.tempChar.combatInfo);
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
    // this._character.generalInfo = generalInfo;
  }

  updateSize(size: SizeEnum) {
    // this._character.combatInfo.cmSizeMod = this.calculateCmSizeMod(size);
    // this._character.combatInfo.acSizeMod = this.calculateAcSizeMod(size);
  }


  updateSavingThrows(savingThrows: SavingThrows) {
    // this._character.savingThrows = savingThrows;
  }
  //-----------------------------------------------------------

  //Skill updates --------------------------------------------------
  updateSkillAbilities(abilities: Abilities, skillList: Skill[], ability: string, skillIds: string[]) {
    // const updatedSkillList = this.updateSkillAbilityScore(ability, skillIds, skillList, abilities);
    // this._character.skillList = this.totService.getSkillsTotals(updatedSkillList, skillIds);
  }

  updateSkills(skillList: Skill[]) {
    // console.log('triggered');
    // this._character.skillList = skillList;
  }
  //----------------------------------------------------------------



  //calcuate methods ----------------------------------------------------------------
  calculateCmSizeMod(size: SizeEnum | undefined) {
    if (size === undefined) {
      return 0;
    }
    switch (size) {
      case SizeEnum.small:
        return -1;
      case SizeEnum.medium:
        return 0;
      case SizeEnum.large:
        return 1;
      case SizeEnum.tiny:
        return -2;
      case SizeEnum.diminutive:
        return -4;
      case SizeEnum.fine:
        return -8;
      case SizeEnum.huge:
        return 2;
      case SizeEnum.gargantuan:
        return 4;
      case SizeEnum.colossal:
        return 8;
      default:
        return 0;
    }
  }

  calculateAcSizeMod(size: SizeEnum | undefined) {
    if (size === undefined) {
      return 0;
    }
    switch (size) {
      case SizeEnum.small:
        return 1;
      case SizeEnum.medium:
        return 0;
      case SizeEnum.large:
        return -1;
      case SizeEnum.tiny:
        return 2;
      case SizeEnum.diminutive:
        return 4;
      case SizeEnum.fine:
        return 8;
      case SizeEnum.huge:
        return -2;
      case SizeEnum.gargantuan:
        return -4;
      case SizeEnum.colossal:
        return -8;
      default:
        return 0;
    }
  }

  calculateAbilityScore(score: number | undefined): number | undefined {
    if (score === undefined || "") {
      return undefined;
    }
    return Math.floor((score - 10) / 2);
  }

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
