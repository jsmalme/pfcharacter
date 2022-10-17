import { Weapon } from "./weapon";
 
export class CombatInfo {
    initiativeTotal: number | undefined;
    initiativeDexMod: number | undefined;
    initiativeMiscMod: number | undefined;
    baseAttackBonus: number | undefined;
    speedBase: string | undefined;
    speedArmor: string | undefined;
    speedFly: string | undefined;
    speedSwim: string | undefined;
    speedClimb: string | undefined;
    speedBurrow: string | undefined;
    speedTempMod: string | undefined;
    cmbTotal: number | undefined;
    cmbStrMod: number | undefined;
    cmbSizeMod: number | undefined;
    cmbMiscMod: number | undefined;
    cmbTempMod: number | undefined;
    weapons: Array<Weapon> | undefined;

    public constructor(init?: Partial<CombatInfo>) {
        Object.assign(this, init);
    }
}

