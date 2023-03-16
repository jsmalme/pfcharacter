export interface IEquipment{
    acItems: AcItem[];
    gear: Gear[];
    totalWeight: number | undefined;
    money: Money;
    weightCaps: WeightCapacity;
}

export class AcItem{
    name: string | undefined = undefined;
    bonus: number | undefined = undefined;
    type: acTypeEnum | undefined = undefined;
    checkPen: number | undefined = undefined;
    spellFailure: number | undefined = undefined;
    properties: string |undefined = undefined;
}

export class Gear{
    name: string | undefined = undefined;
    weight : string | undefined = undefined;
}

export class Money{
    cp: number | undefined = undefined;
    sp: number | undefined = undefined;
    gp: number | undefined = undefined;
    pp: number | undefined = undefined;
}

export class WeightCapacity{
    lightLoad: number | undefined = undefined;
    mediumLoad: number | undefined = undefined;
    heavyLoad: number | undefined = undefined;
    liftOverHead: number | undefined = undefined;
    liftOffGround: number | undefined = undefined;
    dragOrPush: number | undefined = undefined;
}

export class Equipment implements IEquipment{
    acItems: AcItem[];
    gear: Gear[];
    totalWeight: number | undefined = undefined;
    money: Money;
    weightCaps: WeightCapacity;

    constructor(info?: IEquipment){
        if(info){
        Object.assign(this, info);
        }
    }
}

export enum acTypeEnum{
    light = "Light", 
    medium = "Medium", 
    heavy = "Heavy",
    shield = "Shield"
}