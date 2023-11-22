import { Ability } from "./abilities";
import { SizeEnum } from "./general-info";

export interface IEquipment {
    ac_items: AcItem[];
    gear: Gear[];
    money: Money;
    weight_caps: IWeightCapacity;
    total_ac_penalty: number;
    current_burden: burdenEnum;
    ac_items_weight: number;
    gear_weight: number;
}

export interface IWeightCapacity {
    light_load: number | undefined;
    med_load: { min: number, max: number } | undefined;
    heavy_load: { min: number, max: number } | undefined;
    lift_over_head: number | undefined;
    lift_off_ground: number | undefined;
    drag_or_push: number | undefined;
}

export class CapacityRow {
    str_score: number;
    weight_caps: IWeightCapacity = { light_load: 0, med_load: { min: 0, max: 0 }, heavy_load: { min: 0, max: 0 }, drag_or_push: 0, lift_off_ground: 0, lift_over_head: 0 };

    constructor(strScore: number, light: number, medium: { min: number, max: number }, heavy: { min: number, max: number }, sizeMod: number) {
        this.str_score = strScore;
        this.weight_caps.light_load = light * sizeMod;
        this.weight_caps.med_load = { min: medium.min * sizeMod, max: medium.max * sizeMod };
        this.weight_caps.heavy_load = { min: heavy.min * sizeMod, max: heavy.max * sizeMod };
        this.weight_caps.drag_or_push = heavy.max * sizeMod * 5;
        this.weight_caps.lift_off_ground = heavy.max * sizeMod * 2;
        this.weight_caps.lift_over_head = heavy.max * sizeMod;
    }
}

export class AcItem {
    name: string | undefined = undefined;
    bonus: number | undefined = undefined;
    type: acTypeEnum | undefined = undefined;
    check_pen: number | undefined = undefined;
    spell_failure: string | undefined = undefined;
    properties: string | undefined = undefined;
    equipped: boolean = false;
    weight: number | undefined = undefined;
    max_dex: number | undefined = undefined;
}

export class Gear {
    name: string | undefined = undefined;
    weight: number | undefined = undefined;
    quantity: number | undefined = 1;
}

export class Money {
    cp: number | undefined = undefined;
    sp: number | undefined = undefined;
    gp: number | undefined = undefined;
    pp: number | undefined = undefined;
}

export class WeightCapacity implements IWeightCapacity {
    light_load: number | undefined = undefined;
    med_load: { min: number, max: number } | undefined = undefined;
    heavy_load: { min: number, max: number } | undefined = undefined;
    lift_over_head: number | undefined = undefined;
    lift_off_ground: number | undefined = undefined;
    drag_or_push: number | undefined = undefined;

    constructor(info?: IWeightCapacity) {
        if (info) {
            Object.assign(this, info);
        }
    }

    public updateCarryCapacities(str: Ability, size: SizeEnum): void {
        let capacityTable = this.buildCarryCapacityTable(this.capacitySizeEnumMap[size]);
        let caps = capacityTable.find(x => x.str_score == str.ability)?.weight_caps;
        this.light_load = caps?.light_load;
        this.med_load = caps?.med_load;
        this.heavy_load = caps?.heavy_load;
        this.lift_over_head = caps?.lift_over_head;
        this.lift_off_ground = caps?.lift_off_ground;
        this.drag_or_push = caps?.drag_or_push;
    }

    private capacitySizeEnumMap: Record<SizeEnum, number> = {
        [SizeEnum.small]: 3 / 4,
        [SizeEnum.medium]: 1,
        [SizeEnum.large]: 2,
        [SizeEnum.tiny]: 1 / 2,
        [SizeEnum.diminutive]: 1 / 4,
        [SizeEnum.fine]: 1 / 8,
        [SizeEnum.huge]: 4,
        [SizeEnum.gargantuan]: 8,
        [SizeEnum.colossal]: 16
    }

    buildCarryCapacityTable(size: number): CapacityRow[] {
        return [
            new CapacityRow(1, 3, { min: 4, max: 6 }, { min: 7, max: 10 }, size),
            new CapacityRow(2, 6, { min: 7, max: 13 }, { min: 14, max: 20 }, size),
            new CapacityRow(3, 10, { min: 11, max: 20 }, { min: 21, max: 30 }, size),
            new CapacityRow(4, 13, { min: 14, max: 26 }, { min: 27, max: 40 }, size),
            new CapacityRow(5, 16, { min: 17, max: 33 }, { min: 34, max: 50 }, size),
            new CapacityRow(6, 20, { min: 21, max: 40 }, { min: 41, max: 60 }, size),
            new CapacityRow(7, 23, { min: 24, max: 46 }, { min: 47, max: 70 }, size),
            new CapacityRow(8, 26, { min: 27, max: 53 }, { min: 54, max: 80 }, size),
            new CapacityRow(9, 30, { min: 31, max: 60 }, { min: 61, max: 90 }, size),
            new CapacityRow(10, 33, { min: 34, max: 66 }, { min: 67, max: 100 }, size),
            new CapacityRow(11, 38, { min: 39, max: 76 }, { min: 77, max: 115 }, size),
            new CapacityRow(12, 43, { min: 44, max: 86 }, { min: 87, max: 130 }, size),
            new CapacityRow(13, 50, { min: 51, max: 100 }, { min: 101, max: 150 }, size),
            new CapacityRow(14, 58, { min: 59, max: 116 }, { min: 117, max: 175 }, size),
            new CapacityRow(15, 66, { min: 67, max: 133 }, { min: 134, max: 200 }, size),
            new CapacityRow(16, 76, { min: 77, max: 153 }, { min: 154, max: 230 }, size),
            new CapacityRow(17, 86, { min: 87, max: 173 }, { min: 174, max: 260 }, size),
            new CapacityRow(18, 100, { min: 101, max: 200 }, { min: 201, max: 300 }, size),
            new CapacityRow(19, 116, { min: 117, max: 233 }, { min: 234, max: 350 }, size),
            new CapacityRow(20, 133, { min: 134, max: 266 }, { min: 267, max: 400 }, size),
            new CapacityRow(21, 153, { min: 154, max: 306 }, { min: 307, max: 460 }, size),
            new CapacityRow(22, 173, { min: 174, max: 346 }, { min: 347, max: 520 }, size),
            new CapacityRow(23, 200, { min: 201, max: 400 }, { min: 401, max: 600 }, size),
            new CapacityRow(24, 233, { min: 234, max: 466 }, { min: 467, max: 700 }, size),
            new CapacityRow(25, 266, { min: 267, max: 533 }, { min: 534, max: 800 }, size),
            new CapacityRow(26, 306, { min: 307, max: 613 }, { min: 614, max: 920 }, size),
            new CapacityRow(27, 346, { min: 347, max: 693 }, { min: 694, max: 1040 }, size),
            new CapacityRow(28, 400, { min: 401, max: 800 }, { min: 801, max: 1200 }, size),
            new CapacityRow(29, 466, { min: 467, max: 933 }, { min: 934, max: 1400 }, size)
        ]
    }
}

export class Equipment implements IEquipment {
    ac_items: AcItem[];
    gear: Gear[];
    money: Money;
    weight_caps: WeightCapacity;
    current_burden: burdenEnum;
    total_ac_penalty: number = 0;
    ac_items_weight: number;
    gear_weight: number;

    constructor(info?: IEquipment) {
        if (info) {
            Object.assign(this, info);
            this.weight_caps = new WeightCapacity(info.weight_caps);
        }
    }
}

export enum burdenEnum {
    light = "Light",
    medium = "Medium",
    heavy = "Heavy"
}

export enum acTypeEnum {
    light = "Light",
    medium = "Medium",
    heavy = "Heavy",
    shield = "Shield"
}