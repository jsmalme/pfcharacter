import { Abilities, IAbilities } from "./abilities";
import { GeneralInfo } from "./general-info";
import { CombatInfo, ICombatInfo } from "./combat-info";
import { ISavingThrows, SavingThrows } from "./saving-throws";
import { Skill } from "./skills";
import { Equipment, IEquipment } from "./equipment";

export interface ICharacter{
  id: number;
  abilities: IAbilities;
  generalInfo: GeneralInfo;
  combatInfo: ICombatInfo;
  savingThrows: ISavingThrows;
  equipment: IEquipment;
  skillList: Skill[];
}
export class Character {
  id: number;
  generalInfo: GeneralInfo;
  combatInfo: CombatInfo;
  abilities: Abilities;
  savingThrows: SavingThrows;
  skillList: Skill[];
  equipment: Equipment;
  // equipment: Equipment;
  constructor(char?: ICharacter) {
    if(char){
      this.abilities = new Abilities(char.abilities);
      this.generalInfo = new GeneralInfo(char.generalInfo);
      this.combatInfo = new CombatInfo(char.combatInfo);
      this.savingThrows = new SavingThrows(char.savingThrows);
      this.equipment = new Equipment(char.equipment);
      this.skillList = char.skillList;
      // this.equipment = new Equipment(char.equipment);
    }
    else{
      this.abilities = new Abilities();
      this.generalInfo = new GeneralInfo();
      this.combatInfo = new CombatInfo();
      this.savingThrows = new SavingThrows();
      this.equipment = new Equipment();
      this.skillList = [
        new Skill('Acrobatics', 'Dex'),
        new Skill('Appraise', 'Int'),
        new Skill('Bluff', 'Cha'),
        new Skill('Climb', 'Str'),
        new Skill('Craft1', 'Int', false, true),
        new Skill('Craft2', 'Int', false, true),
        new Skill('Craft3', 'Int', false, true),
        new Skill('Diplomacy', 'Cha'),
        new Skill('Disable Device', 'Dex', true),
        new Skill('Disguise', 'Cha'),
        new Skill('Escape Artist', 'Dex'),
        new Skill('Fly', 'Dex'),
        new Skill('Handle Animal', 'Cha', true),
        new Skill('Heal', 'Wis'),
        new Skill('Intimidate', 'Cha'),
        new Skill('Knowledge (Arcana)', 'Int', true),
        new Skill('Knowledge (Dungeoneering)', 'Int', true),
        new Skill('Knowledge (Engineering)', 'Int', true),
        new Skill('Knowledge (Geography)', 'Int', true),
        new Skill('Knowledge (History)', 'Int', true),
        new Skill('Knowledge (Local)', 'Int', true),
        new Skill('Knowledge (Nature)', 'Int', true),
        new Skill('Knowledge (Nobility)', 'Int', true),
        new Skill('Knowledge (Planes)', 'Int', true),
        new Skill('Knowledge (Religion)', 'Int', true),
        new Skill('Linguistics', 'Int', true),
        new Skill('Perception', 'Wis'),
        new Skill('Perform1', 'Cha', false, true),
        new Skill('Perform2', 'Cha', false, true),
        new Skill('Profession1', 'Wis', true, true),
        new Skill('Profession2', 'Wis', true, true),
        new Skill('Ride', 'Dex'),
        new Skill('Sense Motive', 'Wis'),
        new Skill('Sleight of Hand', 'Dex', true),
        new Skill('Spellcraft', 'Int', true),
        new Skill('Stealth', 'Dex'),
        new Skill('Survival', 'Wis'),
        new Skill('Swim', 'Str'),
        new Skill('Use Magic Device', 'Cha', true)
      ]
    } 
  }
}
