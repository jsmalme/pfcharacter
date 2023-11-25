export const CarryCapacityTable: ICarryCapacity[] = [
]

interface ICarryCapacity {
    strengthScore: number | null;
    light_load: number | null;
    mediumLoad: { min: number, max: number };
    heavy_load: { min: number, max: number };
}
