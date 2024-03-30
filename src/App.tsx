import { useEffect, useState } from "react";
import { AppSelect } from "./components/common/AppSelect";
import AppChart from "./components/AppChart";
import { ICountry, ICountryDatum } from "./types/Country";

interface Currency {
    name: string;
    symbol: string;
}

interface CurrencyData {
    [key: string]: Currency;
}
interface ICountryDetails {
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

function App() {
    // const [countryDetails, setCountryDetails] = useState([]);
    // const [changeChartData, setChangeChartData] = useState("population");
    // const [chartData, setChartData] = useState({
    //     populationData: [],
    //     areaData: [],
    // });

    const [countryDetails, setCountryDetails] = useState<ICountryDetails[]>([]);
    const [changeChartData, setChangeChartData] = useState<
        "population" | "area"
    >("population");
    const [chartData, setChartData] = useState<{
        populationData: { x: string; y: number }[];
        areaData: { x: string; y: number }[];
    }>({
        populationData: [],
        areaData: [],
    });

    const [selectedOption, setSelectedOption] = useState<"population" | "area">(
        "population"
    );

    console.log({ chartData });

    const handleChangeValue = (data: "population" | "area") => {
        setSelectedOption(data);
    };

    const getChartData = (option: "population" | "area") => {
        const dataKey = option === "population" ? "populationData" : "areaData";
        return [
            {
                id: option === "population" ? "Population" : "Area",
                data: chartData[dataKey],
            },
        ];
    };
    const fetchData = async () => {
        try {
            const response = await fetch("https://restcountries.com/v3.1/all", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log({ data });
            if (data) {
                const chartData = data.reduce(
                    (
                        acc: {
                            populationData: ICountryDatum[];
                            areaData: ICountryDatum[];
                        },
                        country: ICountryDetails
                    ) => {
                        const currencyCode =
                            country.currencies &&
                            Object.keys(country.currencies)[0];
                        console.log({ currencyCode });
                        const currencyName = country.currencies
                            ? country.currencies[currencyCode].name
                            : "Unknown currency";

                        const currencySymbol = country.currencies
                            ? country.currencies[currencyCode].symbol
                            : "?";

                        const countryLanguage = country.languages
                            ? Object.values(country.languages)
                            : "Unknown";

                        const populationDatum = {
                            x: country.name.common,

                            y: country.population,
                            area: country.area,
                            population: country.population,
                            independent: country.independent,
                            name: country.name.common,
                            region: country.region,
                            timezones: country.timezones,
                            continents: country.continents,
                            capital: country.capital,
                            currencies: country.currencies,
                            languages: country.languages,
                            subregion: country.subregion,
                            flagPng: country.flags.png,
                            flagSvg: country.flags.svg,
                            flagAlt: country.flags.alt,
                            currencySymbol: currencySymbol,
                            currencyName: currencyName,
                            currencyLanguages: countryLanguage,
                        };
                        const areaDatum = {
                            x: country.name.common,
                            y: country.area,
                            area: country.area,
                            population: country.population,
                            independent: country.independent,
                            name: country.name.common,
                            region: country.region,
                            timezones: country.timezones,
                            continents: country.continents,
                            capital: country.capital,
                            currencies: country.currencies,
                            languages: country.languages,
                            subregion: country.subregion,
                            flagPng: country.flags.png,
                            flagSvg: country.flags.svg,
                            flagAlt: country.flags.alt,
                            currencySymbol: currencySymbol,
                            currencyName: currencyName,
                            currencyLanguages: countryLanguage,
                        };

                        acc.populationData.push(populationDatum);
                        acc.areaData.push(areaDatum);

                        return acc;
                    },
                    { populationData: [], areaData: [] }
                );

                console.log({ chartData });
                setChartData(chartData);
                setCountryDetails(data);
            }

            /*




            if (data) {
                const populationData = data.map((country: ICountry) => {
                    return {
                        x: country.name.common,
                        y: country.population,
                    };
                });
                const areaData = data.map((country: ICountry) => {
                    return {
                        x: country.name.common,
                        y: country.area,
                    };
                });
                const chartData = {
                    populationData,
                    areaData,
                };
                setChartData(chartData);
            }

            setCountryDetails(data);
            // console.log(data);

            */
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log({ countryDetails });
    console.log({ chartData });

    if (!chartData) return <h1>Loading...</h1>;

    if (chartData.populationData.length < 1) return;
    return (
        <>
            <AppSelect
                handleValueChange={handleChangeValue}
                selectItems={["population", "area"]}
            />

            <div className="h-96 relative">
                {/* <AppChart data={chartD} changeChartData={changeChartData} /> */}
                <AppChart
                    data={
                        selectedOption === "population"
                            ? getChartData("population")
                            : getChartData("area")
                    }
                    changeChartData={changeChartData}
                />
            </div>
        </>
    );
}
export default App;
