import { Injectable } from '@angular/core';
import { Abilities } from '../../../../../libs/character-classes/abilities';
import { Character } from '../../../../../libs/character-classes//character';
import { GeneralInfo, SizeEnum } from '../../../../../libs/character-classes/general-info';
import { CombatInfo } from '../../../../../libs/character-classes/combat-info';
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
      size: SizeEnum.medium,
      weight: "240",
      baseSpeed: undefined,
      armorSpeed: undefined,
      flyManeuver: undefined,
      swimSpeed: undefined,
      climbSpeed: undefined,
      burrowSpeed: undefined,
      speedTempMods: undefined,
      languages: undefined
    };
    combatInfo: CombatInfo = {
      bab: 3,
      cmbMiscMod: 0,
      cmSizeMod: 1,
      acSizeMod: 0,
      cmbTotal: 4,
      initiativeMiscMod: 1,
      initiativeTotal: 4,
      weapons: undefined,
      hpTotal: undefined,
      hpCurrent: undefined,
      hpNonLethal: undefined,
      spellResistance: undefined,
      damageReduction: undefined,
      cmbBabMod: undefined,
      cmdTotal: undefined,
      cmdBabMod: undefined,
      cmdMiscMod: undefined,
      acTotal: undefined,
      acArmorMod: undefined,
      acShieldMod: undefined,
      acNaturalArmorMod: undefined,
      acDeflectMod: undefined,
      acMiscMod: undefined,
      acTouch: undefined,
      acFlat: undefined
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
    this.character.generalInfo = this.generalInfo
    this.character.abilities = this.abilities;
    this.character.savingThrows = this.savingThrows;
  }

  //character getters
  //todo: make a db to grab this info
  getCharacter(){
    return this.character;
  }

  //charater updates
  updateGeneralInfo(generalInfo: GeneralInfo){
    this.character.combatInfo.cmSizeMod = this.calculateCmSizeMod(generalInfo.size);
    this.character.combatInfo.acSizeMod = this.calculateAcSizeMod(generalInfo.size);
    this.character.generalInfo = generalInfo;
  }

  updateSavingThrows(savingThrows: SavingThrows){
    this.character.savingThrows = savingThrows;
  }

  calculateCmSizeMod(size: SizeEnum | undefined){
    if(size === undefined){
      return 0;
    }
    switch(size){
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

  calculateAcSizeMod(size: SizeEnum | undefined){
    if(size === undefined){
      return 0;
    }
    switch(size){
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
}
