import { useEffect, useState } from "react";
import { AppSelect } from "./components/common/AppSelect";
import AppChart from "./components/AppChart";
import { ICountry } from "./types/Country";

function App() {
    const [countryDetails, setCountryDetails] = useState([]);
    const [changeChartData, setChangeChartData] = useState("population");
    const [chartData, setChartData] = useState({
        populationData: [],
        areaData: [],
    });

    console.log({ chartData });

    const handleChangeValue = (data: string) => {
        setChangeChartData(data);
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
    const { populationData, areaData } = chartData;

    // console.log({ populationData });
    const chartD = [
        {
            id: "country",

            data: changeChartData === "population" ? populationData : areaData,
        },
    ];

    if (chartData.populationData.length < 1) return;
    return (
        <>
            <AppSelect
                handleValueChange={handleChangeValue}
                selectItems={["population", "area"]}
            />

            <div className="h-96 ">
                <AppChart data={chartD} changeChartData={changeChartData} />
            </div>
        </>
    );
}
export default App;
