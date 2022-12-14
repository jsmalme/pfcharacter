export class GeneralInfo {
    characterName: string | undefined;
    playerName: string | undefined;
    alignment: string | undefined;
    classLevel: string | undefined;
    deity: string | undefined;
    homeland: string | undefined;
    race: string | undefined;
    size: SizeEnum | undefined
    gender: string | undefined;
    age: number | undefined; 
    height: string | undefined;
    weight: string | undefined;
    hair: string | undefined;
    eyes: string | undefined;
    baseSpeed: string | undefined;
    armorSpeed: string | undefined;
    flyManeuver: string | undefined;
    swimSpeed: string | undefined;
    climbSpeed: string | undefined;
    burrowSpeed: string | undefined;
    speedTempMods: string | undefined;
    languages: string | undefined;
    notes: string | undefined;
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
