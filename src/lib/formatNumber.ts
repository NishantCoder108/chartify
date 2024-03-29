export const formatPopulation = (population: number): string => {
    if (population >= 1000000) {
        return `${population / 1000000} M`;
    } else if (population >= 1000) {
        return `${(population / 1000).toFixed(1)} K`;
    } else {
        return `${population}`;
    }
};
