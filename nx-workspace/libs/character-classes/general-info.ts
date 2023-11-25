export class GeneralInfo {
    constructor(info?: GeneralInfo) {
        if (info) {
            Object.assign(this, info);
        }
    }
    character_name: string | null = null;
    player_name: string | null = null;
    alignment: string | null = null;
    class_level: string | null = null;
    deity: string | null = null;
    homeland: string | null = null;
    race: string | null = null;
    size: SizeEnum | null = null
    gender: string | null = null;
    age: number | null = null;
    height: string | null = null;
    weight: string | null = null;
    hair: string | null = null;
    eyes: string | null = null;
    base_speed: string | null = null;
    armor_speed: string | null = null;
    fly_maneuver: string | null = null;
    swim_speed: string | null = null;
    climb_speed: string | null = null;
    burrow_speed: string | null = null;
    speed_temp_mods: string | null = null;
    languages: string | null = null;
    notes: string | null = null;
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
