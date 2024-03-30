interface ICurrency {
    name: string;
    symbol: string;
}

interface ILanguage {
    [key: string]: string;
}

export interface IData {
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
    currencies: { [key: string]: ICurrency };
    languages: ILanguage;
    subregion: string;
    flagPng: string;
    flagSvg: string;
    flagAlt: string;
    currencySymbol: string;
    currencyName: string;
    currencyLanguages: string[];
    yStacked: number;
    xFormatted: string;
    yFormatted: string;
}

export interface IDataPoint {
    id: string;
    index: number;
    serieId: string;
    serieColor: string;
    x: number;
    y: number;
    color: string;
    borderColor: string;
    data: IData;
}
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

interface Currency {
    name: string;
    symbol: string;
}

interface CurrencyData {
    [key: string]: Currency;
}
export interface ICountryDetails {
    name: { common: string };
    capital: string[];
    population: number;
    area: number;
    currencyName?: string;
    currencySymbol?: string;
    languages: string[];
    currencies: CurrencyData;
    timezones: string[];
    flag?: string;
    independent: boolean;
    subregion: string;
    continents: string[];
    region: string;
    flags: {
        svg: string;
        png: string;
        alt: string;
    };
    flagPng?: string;
    flagSvg?: string;
    flagAlt?: string;
}
