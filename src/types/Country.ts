interface ICurrency {
    name: string;
    symbol: string;
}

interface ICurrencies {
    [code: string]: ICurrency;
}

export interface ICountry {
    altSpellings: string[];
    area: number;

    borders: string[];
    capital: string[];
    capitalInfo: {
        latlng?: number[];
    };

    car: {
        side: string;
        signs: string[];
    };

    continents: string[];
    currencies: ICurrencies;

    fifa: string;
    flag: string;

    flags: {
        alt: string;
        png: string;
        svg: string;
    };

    gini: {
        [code: number]: number;
    };

    idd: {
        root: string;
        suffixes: string[];
    };

    independent: boolean;
    landlocked: boolean;

    languages: {
        [code: string]: string;
    };

    latlng: number[];
    name: {
        common: string;
        official: string;
    };

    population: number;
    postalCode: {
        format: string;
        regex: string;
    };

    region: string;

    startOfWeek: string;

    status: string;
    subregion: string;
    timezones: string[];

    tld: string[];

    translations: {
        [code: string]: {
            common: string;
            official: string;
        }[];
    };

    unMember: boolean;
}
