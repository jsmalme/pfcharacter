import { ISpells, Spells } from './spells';
import { Abilities, IAbilities } from "./abilities";
import { GeneralInfo } from "./general-info";
import { CombatInfo, ICombatInfo } from "./combat-info";
import { ISavingThrows, SavingThrows } from "./saving-throws";
import { Skill } from "./skills";
import { Equipment, IEquipment, WeightCapacity } from "./equipment";
import { Feat, SpecialAbility } from "./feats-abilities";

export interface ICharacter {
  id: number;
  player: number;
  abilities: IAbilities;
  general_info: GeneralInfo;
  combat_info: ICombatInfo;
  saving_throws: ISavingThrows;
  equipment: IEquipment;
  skills: Skill[];
  spells: ISpells;
  feats: Feat[];
  special_abilities: SpecialAbility[];
}
export class Character {
  id: number;
  player: number;
  general_info: GeneralInfo;
  combat_info: CombatInfo;
  abilities: Abilities;
  saving_throws: SavingThrows;
  skills: Skill[];
  equipment: Equipment;
  spells: Spells;
  feats: Feat[];
  special_abilities: SpecialAbility[];
  constructor(char?: ICharacter) {
    if (char) {
      this.id = char?.id;
      this.player = char?.player;
      this.abilities = new Abilities(char.abilities);
      this.general_info = new GeneralInfo(char.general_info);
      this.combat_info = new CombatInfo(char.combat_info);
      this.saving_throws = new SavingThrows(char.saving_throws);
      this.equipment = new Equipment(char.equipment);
      this.spells = new Spells(char.spells);
      this.skills = char.skills;
      this.feats = char.feats;
      this.special_abilities = char.special_abilities;
    }
    else {
      this.abilities = new Abilities();
      this.general_info = new GeneralInfo();
      this.combat_info = new CombatInfo();
      this.saving_throws = new SavingThrows();
      this.equipment = new Equipment();
      this.spells = new Spells();
      this.equipment.weight_caps = new WeightCapacity();
      this.feats = [];
      this.special_abilities = [];
      this.skills = [
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
