import { SizeEnum } from './general-info';
import { strUnToNum } from 'apps/pfcharacter/src/app/functions/methods';
import { Abilities } from 'libs/character-classes/abilities';
import { Weapon } from "./weapon";

export interface ICombatInfo{
  hpTotal: number | undefined;
  hpCurrent: number | undefined;
  hpNonLethal: string | undefined;
  bab: number | undefined;
  cmSizeMod: number | undefined;
  acSizeMod: number | undefined;
  spellResistance: string | undefined;
  damageReduction: string | undefined;
  initiativeTotal: number | undefined;
  initiativeMiscMod: number | undefined;
  cmbTotal: number | undefined;
  cmbBabMod: number | undefined;
  cmbMiscMod: number | undefined;
  cmdTotal: number | undefined;
  cmdBabMod: number | undefined;
  cmdMiscMod: number | undefined;
  acTotal: number | undefined;
  acArmorMod: number | undefined;
  acShieldMod: number | undefined;
  acNaturalArmorMod: number | undefined;
  acDeflectMod: number | undefined;
  acMiscMod: number | undefined;
  acTouch: number | undefined;
  acFlat: number | undefined;
  weapons: Array<Weapon>;
}
export class CombatInfo implements ICombatInfo{
  constructor(info?: ICombatInfo){
    if(info){
      Object.assign(this, info);
    }
  }
  hpTotal: number | undefined = undefined;
  hpCurrent: number | undefined = undefined;
  hpNonLethal: string | undefined = undefined;
  bab: number | undefined = undefined;
  cmSizeMod: number | undefined = undefined;
  acSizeMod: number | undefined = undefined;
  spellResistance: string | undefined = undefined;
  damageReduction: string | undefined = undefined;
  initiativeTotal: number | undefined = undefined;
  initiativeMiscMod: number | undefined = undefined;
  cmbTotal: number | undefined = undefined;
  cmbBabMod: number | undefined = undefined;
  cmbMiscMod: number | undefined = undefined;
  cmdTotal: number | undefined = undefined;
  cmdBabMod: number | undefined = undefined;
  cmdMiscMod: number | undefined = undefined;
  acTotal: number | undefined = undefined;
  acArmorMod: number | undefined = undefined;
  acShieldMod: number | undefined = undefined;
  acNaturalArmorMod: number | undefined = undefined;
  acDeflectMod: number | undefined = undefined;
  acMiscMod: number | undefined = undefined;
  acTouch: number | undefined = undefined;
  acFlat: number | undefined = undefined;
  weapons: Array<Weapon> = [];

  updateStr(abilities: Abilities) {
    this.cmbTotal = this.getCmbTotal(abilities);
    this.cmdTotal = this.getCmdTotal(abilities);
  }

  updateDex(abilities: Abilities) {
    this.initiativeTotal = this.getInitiativeTotal(abilities);
    this.cmdTotal = this.getCmdTotal(abilities);
    this.acTotal = this.getAcTotal(abilities);
    this.acTouch = this.getAcTouchTotal(abilities);
  }

  updateSize(size: SizeEnum, abilities: Abilities) {
    this.cmSizeMod = this.cmSizeEnumMap[size];
    this.acSizeMod = this.acSizeEnumMap[size];
    this.cmbTotal = this.getCmbTotal(abilities);
    this.cmdTotal = this.getCmdTotal(abilities);
    this.acTotal = this.getAcTotal(abilities);
    this.acTouch = this.getAcTouchTotal(abilities);
    this.acFlat = this.getAcFlatTotal();
  }

  updateCombatInfoTotals(abilities: Abilities) {
    this.cmbTotal = this.getCmbTotal(abilities);
    this.cmdTotal = this.getCmdTotal(abilities);
    this.initiativeTotal = this.getInitiativeTotal(abilities);
    this.acTotal = this.getAcTotal(abilities);
    this.acTouch = this.getAcTouchTotal(abilities);
    this.acFlat = this.getAcFlatTotal();
  }

  private getCmbTotal(abilities: Abilities): number {
    return strUnToNum(this.bab) +
      strUnToNum(abilities.str.useMod) +
      strUnToNum(this.cmSizeMod) +
      strUnToNum(this.cmbMiscMod);
  }

  private getCmdTotal(abilities: Abilities): number {
    return strUnToNum(this.bab) +
      strUnToNum(abilities.str.useMod) +
      strUnToNum(abilities.dex.useMod) +
      strUnToNum(this.cmSizeMod) +
      strUnToNum(this.cmdMiscMod) + 10;
  }

  private getInitiativeTotal(abilities: Abilities): number {
    return strUnToNum(abilities.dex.useMod) +
      strUnToNum(this.initiativeMiscMod);
  }

  private getAcTotal(abilities: Abilities): number {
    return strUnToNum(this.acArmorMod) +
      strUnToNum(this.acShieldMod) +
      strUnToNum(abilities.dex.useMod) +
      strUnToNum(this.acSizeMod) +
      strUnToNum(this.acNaturalArmorMod) +
      strUnToNum(this.acDeflectMod) +
      strUnToNum(this.acMiscMod) + 10;
  }

  private getAcTouchTotal(abilities: Abilities): number {
    return strUnToNum(abilities.dex.useMod) +
      strUnToNum(this.acDeflectMod) +
      strUnToNum(this.acSizeMod) +
      strUnToNum(this.acMiscMod) + 10;
  }

  private getAcFlatTotal(): number {
    return strUnToNum(this.acArmorMod) +
      strUnToNum(this.acShieldMod) +
      strUnToNum(this.acSizeMod) +
      strUnToNum(this.acNaturalArmorMod) +
      strUnToNum(this.acDeflectMod) +
      strUnToNum(this.acMiscMod) + 10;
  }

  private cmSizeEnumMap: Record<SizeEnum, number> = {
    [SizeEnum.small]: -1,
    [SizeEnum.medium]: 0,
    [SizeEnum.large]: 1,
    [SizeEnum.tiny]: -2,
    [SizeEnum.diminutive]: -4,
    [SizeEnum.fine]: -8,
    [SizeEnum.huge]: 2,
    [SizeEnum.gargantuan]: 4,
    [SizeEnum.colossal]: 8
  }

  private acSizeEnumMap: Record<SizeEnum, number> = {
    [SizeEnum.small]: 1,
    [SizeEnum.medium]: 0,
    [SizeEnum.large]: -1,
    [SizeEnum.tiny]: 2,
    [SizeEnum.diminutive]: 4,
    [SizeEnum.fine]: 8,
    [SizeEnum.huge]: -2,
    [SizeEnum.gargantuan]: -4,
    [SizeEnum.colossal]: -8
  }
}

