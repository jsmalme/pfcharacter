export class GeneralInfo {
    constructor(info?: GeneralInfo){
        if(info){
            Object.assign(this, info);
        }
    }
    characterName: string | undefined = undefined;
    playerName: string | undefined = undefined;
    alignment: string | undefined = undefined;
    classLevel: string | undefined = undefined;
    deity: string | undefined = undefined;
    homeland: string | undefined = undefined;
    race: string | undefined = undefined;
    size: SizeEnum | undefined = undefined
    gender: string | undefined = undefined;
    age: number | undefined = undefined; 
    height: string | undefined = undefined;
    weight: string | undefined = undefined;
    hair: string | undefined = undefined;
    eyes: string | undefined = undefined;
    baseSpeed: string | undefined = undefined;
    armorSpeed: string | undefined = undefined;
    flyManeuver: string | undefined = undefined;
    swimSpeed: string | undefined = undefined;
    climbSpeed: string | undefined = undefined;
    burrowSpeed: string | undefined = undefined;
    speedTempMods: string | undefined = undefined;
    languages: string | undefined = undefined;
    notes: string | undefined = undefined;
}

export enum SizeEnum {
    small = "Small", 
    medium = "Medium", 
    large = "Large",
    tiny = "Tiny",
    diminutive = "Diminutive",
    fine = "Fine",
    huge = "Huge",
    gargantuan = "Gargantuan",
    colossal = "Colossal"
}
