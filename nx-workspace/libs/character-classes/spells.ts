export interface ISpells {
    modifiers: string | null;
    domains_specialty: string | null;
    spell_list: Array<Spell>;
    spell_stats: Array<SpellStat>;
}

export class Spell {
    name: string;
    level: number;
    castTime: string | null;
    components: string | null;
    range: string | null;
    area: string | null;
    duration: string | null;
    description: string | null;
    shortDescription: string;
    link: string | null;
    school: string | null;
    savingThrow: string | null;
    spellResistance: string | null;
    usedCount: number = 0;
}

export class SpellStat {
    spellsPerDay: number = 0;
    spellsKnown: number = 0;
    saveDc: number = 0;
    bonusSpells: number = 0;
    used: number = 0;
    available: number = 0;
    totalSpellMarkers: number = 0;
}

export class Spells implements ISpells {
    modifiers: string | null = null;
    domains_specialty: string | null = null;
    spell_list: Array<Spell> = new Array<Spell>();
    spell_stats: Array<SpellStat> = new Array<SpellStat>(10);

    constructor(spells?: ISpells) {
        if (spells) {
            Object.assign(this, spells);
        }
        else {
            this.spell_stats = new Array<SpellStat>(10).fill(new SpellStat());
        }
    }
}