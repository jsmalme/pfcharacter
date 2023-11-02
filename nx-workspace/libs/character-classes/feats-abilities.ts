
export class Feat {
    name: string;
    type: FeatTypeEnum;
    prerequisites: string | undefined;
    benefit: string | undefined;
    constructor(feat: Feat | undefined) {
        if (feat) {
            this.name = feat.name;
            this.type = feat.type;
            this.prerequisites = feat.prerequisites;
            this.benefit = feat.benefit;
        }
        else {
            this.name = '';
            this.type = FeatTypeEnum.general;
            this.prerequisites = '';
            this.benefit = '';
        }
    }
}

export class SpecialAbility {
    name: string;
    benefit: string | undefined;
}

export enum FeatTypeEnum {
    general = 'General',
    combat = 'Combat',
    conduit = 'Conduit',
    itemCreation = 'Item Creation',
    metamagic = 'Metamagic',
    other = 'Other',
}