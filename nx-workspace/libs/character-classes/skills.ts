export class Skill {
    id: string;
    name: string;
    classSkill: boolean = false;
    favorite: boolean = false;
    hasSkillName: boolean;
    trainedSkill: boolean;
    total: number = 0;
    abilityName: string;
    abilityMod: number = 0;
    class: number = 0;
    ranks: number = 0;
    racial: number = 0;
    trait: number = 0;
    misc: number = 0;
    checkPenalty: number = 0;

    constructor(id: string, ability: string, trained: boolean = false, skillName: boolean = false) {
        this.id = id;
        this.name = id;
        if (id.includes("Craft")) { this.name = "Craft" };
        if (id.includes("Perform")) { this.name = "Perform" };
        if (id.includes("Profession")) { this.name = "Profession" };
        this.abilityName = ability;
        this.trainedSkill = trained;
        this.hasSkillName = skillName;
    }
}