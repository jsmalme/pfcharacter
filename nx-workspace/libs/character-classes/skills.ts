export class Skill {
    id: string;
    name: string;
    class_skill: boolean = false;
    favorite: boolean = false;
    has_skill_name: boolean;
    trained_skill: boolean;
    total: number = 0;
    ability_name: string;
    ability_mod: number = 0;
    class: number = 0;
    ranks: number = 0;
    racial: number = 0;
    trait: number = 0;
    misc: number = 0;
    check_penalty: number = 0;

    constructor(id: string, ability: string, trained: boolean = false, skillName: boolean = false) {
        this.id = id;
        this.name = id;
        if (id.includes("Craft")) { this.name = "Craft" };
        if (id.includes("Perform")) { this.name = "Perform" };
        if (id.includes("Profession")) { this.name = "Profession" };
        this.ability_name = ability;
        this.trained_skill = trained;
        this.has_skill_name = skillName;
    }
}
