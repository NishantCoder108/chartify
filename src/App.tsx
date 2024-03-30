import { useEffect, useState } from "react";
import { AppSelect } from "./components/common/AppSelect";
import AppChart from "./components/AppChart";
import { ICountryDatum, ICountryDetails } from "./types/Country";

type SelectedOption = "population" | "area";
interface ChartData {
    populationData: { x: string; y: number }[];
    areaData: { x: string; y: number }[];
}
function App() {
    const [chartData, setChartData] = useState<ChartData>({
        populationData: [],
        areaData: [],
    });
    const [selectedOption, setSelectedOption] =
        useState<SelectedOption>("population");

    console.log({ chartData });

    const handleChangeValue = (data: SelectedOption) => {
        setSelectedOption(data);
    };

    const getChartData = (option: SelectedOption) => {
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

                setChartData(chartData);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log({ chartData });

    if (
        chartData.areaData.length === 0 ||
        chartData.populationData.length === 0
    ) {
        return "Loading...";
    }
    return (
        <div className="p-3">
            <div className="flex gap-4 items-center text-sm justify-start px-3 pt-4">
                <h1>Select metric</h1>
                <AppSelect
                    handleValueChange={handleChangeValue}
                    selectItems={["population", "area"]}
                />
            </div>

            <div className="h-full py-10 overflow-hidden">
                <AppChart
                    data={
                        selectedOption === "population"
                            ? getChartData("population")
                            : getChartData("area")
                    }
                    changeChartData={selectedOption}
                />
            </div>
        </div>
    );
}
export default App;
