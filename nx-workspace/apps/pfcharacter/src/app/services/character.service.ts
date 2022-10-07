import { Injectable } from '@angular/core';
import { Abilities } from '../../../../../libs/character-classes/abilities';
import { Character } from '../../../../../libs/character-classes//character';
import { GeneralInfo } from '../../../../../libs/character-classes/general-info';
import { OffenseInfo } from '../../../../../libs/character-classes/offense-info';
import { SavingThrows } from '../../../../../libs/character-classes/saving-throws';

@Injectable({
  providedIn: 'root'
})

export class CharacterService {
    generalInfo: GeneralInfo = {
      age: 27,
      alignment: "Chaotic Good",
      characterName: "Belripostious",
      classLevel: "Sorcerer - Level 14",
      deity: "Beepity Bop",
      eyes: "Red",
      gender: "Male",
      hair: "Purple",
      height: "6'7",
      homeland: "Gnor",
      notes: `-This character is my favorite.\n-He is also very crazy, don't mess with this boy.`,
      playerName: "Sir Joseph of Alconbury",
      race: "Dark Elf",
      size: "Medium",
      weight: "240"
    };
    offenseInfo: OffenseInfo = {
      baseAttackBonus: 3,
      cmbMiscMod: 0,
      cmbSizeMod: 1, 
      cmbStrMod: 3,
      cmbTempMod: 0,
      cmbTotal: 4,
      initiativeDexMod: 3,
      initiativeMiscMod: 1,
      initiativeTotal: 4,
      speedArmor: '30 ft', 
      speedBase: '20 ft', 
      speedBurrow: '5 ft',
      speedClimb: '12 ft', 
      speedFly: '30 ft', 
      speedSwim: '15 ft',
      speedTempMod: '0', 
      weapons: undefined
    };
    abilities: Abilities ={
      str: 13,
      strMod: 1,
      strTempAdj: undefined,
      strTempMod: undefined,
      dex: 17,
      dexMod: 3,
      dexTempAdj: undefined,
      dexTempMod: undefined,
      con: 15,
      conMod: 2,
      conTempAdj: undefined,
      conTempMod: undefined,
      int: 15, 
      intMod: 2,
      intTempAdj: undefined,
      intTempMod: undefined,
      wis: 12,
      wisMod: 1,
      wisTempAdj: undefined,
      wisTempMod: undefined,
      cha: 20,
      chaMod: 5,
      chaTempAdj: undefined,
      chaTempMod: undefined
    }
    savingThrows: SavingThrows = {
      for: {
        forBase: 1,
        forAbility: 2,
        forMagic: undefined,
        forMisc: undefined,
        forTemp: undefined,
        forOther: undefined,
        forTotal: 3
      },
      ref: {
        refBase: 2,
        refAbility: 3,
        refMagic: 2,
        refMisc: undefined,
        refTemp: undefined,
        refOther: undefined,
        refTotal: 7
      },
      will: {
        willBase: 3,
        willAbility: 1,
        willMagic: undefined,
        willMisc: 1,
        willTemp: 1,
        willOther: undefined,
        willTotal: 6
      }
    }

  public character: Character = new Character;
  constructor() {
    this.character.abilities = new Abilities;
    this.character.savingThrows = new SavingThrows;
  }

  //character getters
  //todo: make a db to grab this info
  getGeneralInfo(){
    return this.character.generalInfo = this.generalInfo;
  }
  getOffenseInfo(){
    return this.character.offenseInfo = this.offenseInfo;
  }
  getAbilities(){
    return this.character.abilities = this.abilities;
  }
  getSavingThrows(){
    return this.character.savingThrows = this.savingThrows;
  }

  //charater updates
  updateGeneralInfo(generalInfo: GeneralInfo){
    this.generalInfo = generalInfo;
  }
  updateAbilities(abilities: Abilities){
    this.abilities = abilities;
  }
  updateSavingThrows(savingThrows: SavingThrows){
    this.savingThrows = savingThrows;
  }

  calculateAbilityScores(abilities: Abilities){
    abilities.chaMod = this.calculateAbilityScore(abilities.cha);
    abilities.chaTempMod = this.calculateAbilityScore(abilities.chaTempAdj);
    abilities.conMod = this.calculateAbilityScore(abilities.con);
    abilities.conTempMod = this.calculateAbilityScore(abilities.conTempAdj);
    abilities.dexMod = this.calculateAbilityScore(abilities.dex);
    abilities.dexTempMod = this.calculateAbilityScore(abilities.dexTempAdj);
    abilities.intMod = this.calculateAbilityScore(abilities.int);
    abilities.intTempMod = this.calculateAbilityScore(abilities.intTempAdj);
    abilities.strMod = this.calculateAbilityScore(abilities.str);
    abilities.strTempMod = this.calculateAbilityScore(abilities.strTempAdj);
    abilities.wisMod = this.calculateAbilityScore(abilities.wis);
    abilities.wisTempMod = this.calculateAbilityScore(abilities.wisTempAdj); 
    return abilities;
  }

  calculateAbilityScore(score: number | undefined){
    if(score === undefined || ""){
      return undefined;
    }
    return Math.floor((score - 10)/2);
  }
}
