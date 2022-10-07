export class Abilities {
    str: number | undefined;
    strMod: number | undefined;
    strTempAdj: number | undefined;
    strTempMod: number | undefined;
    dex: number | undefined;
    dexMod: number | undefined;
    dexTempAdj: number | undefined;
    dexTempMod: number | undefined;
    con: number | undefined;
    conMod: number | undefined;
    conTempAdj: number | undefined;
    conTempMod: number | undefined;
    int: number | undefined; 
    intMod: number | undefined;
    intTempAdj: number | undefined;
    intTempMod: number | undefined;
    wis: number | undefined;
    wisMod: number | undefined;
    wisTempAdj: number | undefined;
    wisTempMod: number | undefined;
    cha: number | undefined;
    chaMod: number | undefined;
    chaTempAdj: number | undefined;
    chaTempMod: number | undefined
    public constructor(init?: Partial<Abilities>) {
        Object.assign(this, init);
    }

    
}
