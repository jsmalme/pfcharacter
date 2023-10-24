export interface ISpells {
    modifiers: string | undefined;
    domains_specialty: string | undefined;
    spells: Array<Spell> | undefined;
    stats: Array<SpellStat> | undefined;
}

export class Spell {
    name: string | undefined;
    level: number | undefined;
    castTime: string | undefined;
    components: string | undefined;
    range: string | undefined;
    area: string | undefined;
    duration: string | undefined;
    description: string | undefined;
    shortDescription: string | undefined;
    link: string | undefined;
}

export class SpellStat {
    spellsPerDay: number = 0;
    spellsKnown: number = 0;
    saveDc: number = 0;
    bonusSpells: number = 0;
}

export class Spells implements ISpells {
    modifiers: string | undefined = undefined;
    domains_specialty: string | undefined = undefined;
    spells: Array<Spell> | undefined = undefined;
    stats: Array<SpellStat> | undefined = new Array<SpellStat>(10);

    constructor(spells?: ISpells) {
        if (spells) {
            Object.assign(this, spells);
        }
    }
}