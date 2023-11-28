import { SizeEnum } from './general-info';
import { strUnToNum } from 'apps/pfcharacter/src/app/functions/methods';
import { Abilities } from 'libs/character-classes/abilities';
import { Weapon } from "./weapon";

export interface ICombatInfo {
  hpTotal: number | null;
  hpCurrent: number | null;
  hpNonLethal: string | null;
  bab: number | null;
  cmSizeMod: number | null;
  acSizeMod: number | null;
  spellResistance: string | null;
  damageReduction: string | null;
  initiativeTotal: number | null;
  initiativeMiscMod: number | null;
  cmbTotal: number | null;
  cmbBabMod: number | null;
  cmbMiscMod: number | null;
  cmdTotal: number | null;
  cmdBabMod: number | null;
  cmdMiscMod: number | null;
  acTotal: number | null;
  acNaturalArmorMod: number | null;
  acDeflectMod: number | null;
  acMiscMod: number | null;
  acTouch: number | null;
  acFlat: number | null;
  weapons: Array<Weapon>;
  weaponsWeight: number | null;
}
export class CombatInfo implements ICombatInfo {
  constructor(info?: ICombatInfo) {
    if (info) {
      Object.assign(this, info);
    }
  }
  hpTotal: number | null = null;
  hpCurrent: number | null = null;
  hpNonLethal: string | null = null;
  bab: number | null = null;
  cmSizeMod: number | null = null;
  acSizeMod: number | null = null;
  spellResistance: string | null = null;
  damageReduction: string | null = null;
  initiativeTotal: number | null = null;
  initiativeMiscMod: number | null = null;
  cmbTotal: number | null = null;
  cmbBabMod: number | null = null;
  cmbMiscMod: number | null = null;
  cmdTotal: number | null = null;
  cmdBabMod: number | null = null;
  cmdMiscMod: number | null = null;
  acTotal: number | null = null;
  acNaturalArmorMod: number | null = null;
  acDeflectMod: number | null = null;
  acMiscMod: number | null = null;
  acTouch: number | null = null;
  acFlat: number | null = null;
  weaponsWeight: number | null;
  weapons: Array<Weapon> = [];

  updateSize(size: SizeEnum) {
    this.cmSizeMod = this.cmSizeEnumMap[size];
    this.acSizeMod = this.acSizeEnumMap[size];
  }

  getCombatInfoTotals(abilities: Abilities, acDex: number, acArmor: number, acShield: number) {
    this.cmbTotal = this.getCmbTotal(abilities);
    this.cmdTotal = this.getCmdTotal(abilities);
    this.initiativeTotal = this.getInitiativeTotal(abilities);
    this.acTotal = this.getAcTotal(acDex, acArmor, acShield);
    this.acTouch = this.getAcTouchTotal(acDex);
    this.acFlat = this.getAcFlatTotal(acArmor, acShield);
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

  private getAcTotal(acDex: number, acArmor: number, acShield: number): number {
    return acArmor +
      acShield +
      acDex +
      strUnToNum(this.acSizeMod) +
      strUnToNum(this.acNaturalArmorMod) +
      strUnToNum(this.acDeflectMod) +
      strUnToNum(this.acMiscMod) + 10;
  }

  private getAcTouchTotal(acDex: number): number {
    return acDex +
      strUnToNum(this.acDeflectMod) +
      strUnToNum(this.acSizeMod) +
      strUnToNum(this.acMiscMod) + 10;
  }

  private getAcFlatTotal(acArmor: number, acShield: number): number {
    return acArmor +
      acShield +
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

