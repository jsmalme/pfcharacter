export class Skill{
    name: string | undefined;
    classSkill: boolean = false;
    favorite: boolean = false;
    hasSkillName: boolean;
    trainedSkill: boolean;
    total: number | undefined;
    abilityName: string | undefined;
    abilityMod: number | undefined;
    class: number |  undefined;
    ranks: number | undefined;
    racial: number | undefined;
    trait: number | undefined;
    misc: number | undefined;

    constructor(name: string, trained: boolean = false, skillName: boolean = false){
        this.name = name;
        this.trainedSkill = trained;
        this.hasSkillName = skillName;
    }
}