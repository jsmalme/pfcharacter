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
}

