export class GeneralInfo {
    characterName: string | undefined;
    playerName: string | undefined;
    alignment: string | undefined;
    classLevel: string | undefined;
    deity: string | undefined;
    homeland: string | undefined;
    race: string | undefined;
    size: string | undefined;
    gender: string | undefined;
    age: number | undefined; 
    height: string | undefined;
    weight: string | undefined;
    hair: string | undefined;
    eyes: string | undefined;
    notes: string | undefined;
    
    public constructor(init?: Partial<GeneralInfo>) {
        Object.assign(this, init);
    }
}
