import { Abilities } from "./abilities";
import { GeneralInfo } from "./general-info";
import { CombatInfo } from "./combat-info";
import { SavingThrows } from "./saving-throws";
import { Skill } from "./skills";

export class Character {
    generalInfo: GeneralInfo = new GeneralInfo;
    combatInfo: CombatInfo = new CombatInfo;
    abilities: Abilities = new Abilities; 
    savingThrows: SavingThrows = new SavingThrows;
    skillList: Skill[] = [
        new Skill('Acrobatics'),
        new Skill('Appraise'),
        new Skill('Bluff'),
        new Skill('Climb'),
        new Skill('Craft', false, true),
        new Skill('Craft', false, true),
        new Skill('Craft', false, true),
        new Skill('Diplomacy'),
        new Skill('Disable Device', true),
        new Skill('Disguise'),
        new Skill('Escape Artist'),
        new Skill('Fly'),
        new Skill('Handle Animal', true),
        new Skill('Heal'),
        new Skill('Intimidate'),
        new Skill('Knowledge (Arcana)', true),
        new Skill('Knowledge (Dungeoneering)', true),
        new Skill('Knowledge (Engineering)', true),
        new Skill('Knowledge (Geography)', true),
        new Skill('Knowledge (History)', true),
        new Skill('Knowledge (Local)', true),
        new Skill('Knowledge (Nature)', true),
        new Skill('Knowledge (Nobility)', true),
        new Skill('Knowledge (Planes)', true),
        new Skill('Knowledge (Religion)', true),
        new Skill('Linguistics', true),
        new Skill('Perception'),
        new Skill('Perform', false, true),
        new Skill('Perform', false, true),
        new Skill('Profession', true, true),
        new Skill('Profession', true, true),
        new Skill('Ride'),
        new Skill('Sense Motive'),
        new Skill('Sleight of Hand', true),
        new Skill('Spellcraft', true),
        new Skill('Stealth'),
        new Skill('Survival'),
        new Skill('Swim'),
        new Skill('Use Magic Device', true)
    ]
    constructor(){
    };
}
