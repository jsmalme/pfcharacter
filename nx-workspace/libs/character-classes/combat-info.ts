import { SizeEnum } from './general-info';
import { strUnToNum } from 'apps/pfcharacter/src/app/functions/methods';
import { Abilities } from 'libs/character-classes/abilities';
import { Weapon } from "./weapon";
export class CombatInfo {
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
      strUnToNum(abilities.useStrMod) +
      strUnToNum(this.cmSizeMod) +
      strUnToNum(this.cmbMiscMod);
  }

  private getCmdTotal(abilities: Abilities): number {
    return strUnToNum(this.bab) +
      strUnToNum(abilities.useStrMod) +
      strUnToNum(abilities.useDexMod) +
      strUnToNum(this.cmSizeMod) +
      strUnToNum(this.cmdMiscMod) + 10;
  }

  private getInitiativeTotal(abilities: Abilities): number {
    return strUnToNum(abilities.useDexMod) +
      strUnToNum(this.initiativeMiscMod);
  }

  private getAcTotal(abilities: Abilities): number {
    return strUnToNum(this.acArmorMod) +
      strUnToNum(this.acShieldMod) +
      strUnToNum(abilities.useDexMod) +
      strUnToNum(this.acSizeMod) +
      strUnToNum(this.acNaturalArmorMod) +
      strUnToNum(this.acDeflectMod) +
      strUnToNum(this.acMiscMod) + 10;
  }

  private getAcTouchTotal(abilities: Abilities): number {
    return strUnToNum(abilities.useDexMod) +
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

