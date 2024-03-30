interface ICurrency {
    name: string;
    symbol: string;
}

interface ICurrencies {
    [code: string]: ICurrency;
}
export interface ICountryDatum {
    x: string;
    y: number;
    area: number;
    population: number;
    independent: boolean;
    name: string;
    region: string;
    timezones: string[];
    continents: string[];
    capital: string[];

    currencyLanguages: string | string[];
    subregion: string;
    flagPng: string;
    flagSvg: string;
    flagAlt: string;
    currencySymbol?: string;
    currencyName?: string;
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

export interface IClickedPoint {
    id: string;
    borderColor: string;
    color: string;
    index: number;
    serieColor: string;
    serieId: string;
    x: number;
    y: number;
    data: ICountryDatum;
}
