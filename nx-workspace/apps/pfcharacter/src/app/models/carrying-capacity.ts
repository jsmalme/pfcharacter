export const CarryCapacityTable: ICarryCapacity[] = [
]

interface ICarryCapacity {
    strengthScore: number | undefined;
    light_load: number | undefined;
    mediumLoad: { min: number, max: number };
    heavy_load: { min: number, max: number };
}
