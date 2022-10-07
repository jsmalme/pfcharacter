import { Abilities } from "./abilities";
import { GeneralInfo } from "./general-info";
import { OffenseInfo } from "./offense-info";
import { SavingThrows } from "./saving-throws";

export class Character {
    generalInfo: GeneralInfo = new GeneralInfo;
    offenseInfo: OffenseInfo = new OffenseInfo;
    abilities: Abilities = new Abilities; 
    savingThrows: SavingThrows = new SavingThrows;
    constructor(){
    };
}
