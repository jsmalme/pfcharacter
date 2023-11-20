export class GeneralInfo {
    constructor(info?: GeneralInfo) {
        if (info) {
            Object.assign(this, info);
        }
    }
    character_name: string | undefined = undefined;
    player_name: string | undefined = undefined;
    alignment: string | undefined = undefined;
    class_level: string | undefined = undefined;
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
    base_speed: string | undefined = undefined;
    armor_speed: string | undefined = undefined;
    fly_maneuver: string | undefined = undefined;
    swim_speed: string | undefined = undefined;
    climb_speed: string | undefined = undefined;
    burrow_speed: string | undefined = undefined;
    speed_temp_mods: string | undefined = undefined;
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
