export interface ISpells {
    modifiers: string | undefined;
    domains_specialty: string | undefined;
    spellList: Array<Spell> | undefined;
    stats: Array<SpellStat> | undefined;
}

export class Spell {
    name: string;
    level: number;
    castTime: string | undefined;
    components: string | undefined;
    range: string | undefined;
    area: string | undefined;
    duration: string | undefined;
    description: string | undefined;
    shortDescription: string;
    link: string | undefined;
    school: string | undefined;
    savingThrow: string | undefined;
    spellResistance: string | undefined;
    usedCount: number = 0;
}

export class SpellStat {
    spellsPerDay: number = 0;
    spellsKnown: number = 0;
    saveDc: number = 0;
    bonusSpells: number = 0;
    used: number = 0;
}

export class Spells implements ISpells {
    modifiers: string | undefined = undefined;
    domains_specialty: string | undefined = undefined;
    spellList: Array<Spell> = new Array<Spell>();
    stats: Array<SpellStat> = new Array<SpellStat>(10);

    constructor(spells?: ISpells) {
        if (spells) {
            Object.assign(this, spells);
        }
    }
}