import { formatPopulation } from "@/lib/formatNumber";
import { ICountryDatum } from "@/types/Country";

interface IProps {
    countryDetails: ICountryDatum;
}
const CountryDetailsCard = ({ countryDetails }: IProps) => {
    const {
        name,
        area,
        capital,
        continents,
        currencyLanguages,
        flagAlt,
        flagPng,
        independent,
        population,
        region,
        subregion,
        timezones,
        currencyName,
        currencySymbol,
    } = countryDetails;

    return (
        <div>
            <div className="flex flex-col bg-white shadow-lg rounded-lg max-w-sm mx-auto">
                <div className="flex justify-center pt-3">
                    <img
                        src={flagPng}
                        alt={flagAlt}
                        className="object-cover w-20 h-20 rounded-full"
                    />
                </div>
                <div className="px-3 py-2 ">
                    <h2 className="text-['rgb(15 23 42)'] text-xl font-semibold">
                        {name}
                    </h2>
                    <p className="mt-1 text-slate-500 text-sm">
                        {capital} is the capital of {name}. It is located in the{" "}
                        {region} region and the {subregion} subregion. The
                        country is part of the {continents} continent and has a
                        population of {formatPopulation(population, 2)}.
                    </p>
                </div>
                <div className="px-3 py-2 bg-gray-100 text-gray-700">
                    <h3 className="text-sm tracking-wide uppercase">Details</h3>
                    <ul className="mt-1 text-sm">
                        <li>
                            <strong>Independence:</strong>{" "}
                            {independent ? "Yes" : "No"}
                        </li>
                        <li>
                            <strong>Timezones:</strong> {timezones.join(", ")}
                        </li>
                        <li>
                            <strong>Currency:</strong> {currencyName} (
                            {currencySymbol})
                        </li>
                        <li>
                            <strong>Languages:</strong>{" "}
                            {Array.isArray(currencyLanguages)
                                ? currencyLanguages.join(", ")
                                : currencyLanguages}
                        </li>

                        <li>
                            <strong>Area:</strong> {formatPopulation(area, 2)}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CountryDetailsCard;
