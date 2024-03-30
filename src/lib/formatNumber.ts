export const formatPopulation = (
    population: number,
    fixedAmount: number = 0
): string => {
    if (population >= 1000000) {
        return `${(population / 1000000).toFixed(fixedAmount)} M`;
    } else if (population >= 1000) {
        return `${(population / 1000).toFixed(1)} K`;
    } else {
        return `${population}`;
    }
};
