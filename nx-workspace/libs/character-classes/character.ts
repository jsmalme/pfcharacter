import { Abilities } from "./abilities";
import { GeneralInfo } from "./general-info";
import { CombatInfo } from "./combat-info";
import { SavingThrows } from "./saving-throws";

export class Character {
    generalInfo: GeneralInfo = new GeneralInfo;
    combatInfo: CombatInfo = new CombatInfo;
    abilities: Abilities = new Abilities; 
    savingThrows: SavingThrows = new SavingThrows;
    constructor(){
    };
}
