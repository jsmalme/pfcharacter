export const CarryCapacityTable: ICarryCapacity[] = [
]

interface ICarryCapacity{
    strengthScore: number | undefined;
    lightLoad: number | undefined;
    mediumLoad: {min: number, max: number};
    heavyLoad: {min: number, max: number};
}
