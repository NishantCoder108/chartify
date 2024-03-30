import React from "react";
import CountryDetailsCard from "./CountryDetailsCard";
import { ICountryDatum } from "@/types/Country";

interface IProps {
    selectedPoints: ICountryDatum[];
}
const DragableCard = ({ selectedPoints }: IProps) => {
    return (
        <div className="my-11 p-1 lg:p-6   border-t-2  border-slate-200 flex flex-wrap items-start justify-evenly gap-6">
            {selectedPoints.length > 0
                ? selectedPoints?.map((selectedPoint, i) => (
                      <CountryDetailsCard
                          key={selectedPoint.x + i}
                          countryDetails={selectedPoint}
                      />
                  ))
                : "No selected points."}
        </div>
    );
};

export default DragableCard;
