// import { ICountry } from "@/types/Country";
import { debounce } from "@/lib/debounce";
import { formatPopulation } from "@/lib/formatNumber";
import { PointTooltipProps, ResponsiveLine } from "@nivo/line";
import { useState } from "react";
import * as d3 from "d3";

interface Point {
    x: string;
    y: number;
    yStacked: number;
}

interface IDataPoint {
    x: string;
    y: number;
}

interface IChartData {
    id: string;
    color?: string;
    data: IDataPoint[];
}

interface IClickedPointData {
    color: string;
    xFormatted: string;
    y: number;
    yFormatted: string;
    x: string;
    yStacked: number;
}
interface IClickedPoint {
    id: string;
    borderColor: string;
    color: string;
    index: number;
    serieColor: string;
    serieId: string;
    x: number;
    y: number;
    data: IClickedPointData;
}

interface IProps {
    data: {
        id: string;
        data?: IDataPoint[];
    };
    changeChartData?: string;
}

const AppChart = ({ data, changeChartData }: IProps) => {
    console.log({ data });
    const [selectedPoints, setSelectedPoints] = useState<IClickedPoint[]>([]);

    // const handlePointClick = (point: IClickedPoint) => {
    //     console.log({ point });
    //     setSelectedPoint(point);
    // };

    // const handlePointClick = (point) => {
    //     setSelectedPoints((prevSelectedPoints) => {
    //         const pointIndex = prevSelectedPoints.findIndex(
    //             (p) => p.x === point.data.x
    //         );
    //         if (pointIndex === -1) {
    //             return [...prevSelectedPoints, point.data];
    //         } else {
    //             const updatedPoints = [...prevSelectedPoints];
    //             updatedPoints.splice(pointIndex, 1);
    //             return updatedPoints;
    //         }
    //     });
    // };

    const handlePointClick = (point) => {
        setSelectedPoints((prevSelectedPoints) => {
            const pointIndex = prevSelectedPoints.findIndex(
                (p) => p.x === point.data.x
            );
            if (pointIndex === -1) {
                return [...prevSelectedPoints, point.data];
            } else {
                const updatedPoints = [...prevSelectedPoints];
                updatedPoints.splice(pointIndex, 1);
                return updatedPoints;
            }
        });
    };
    const CustomTooltip = ({ point }: PointTooltipProps) => (
        <div
            className="cursor-pointer"
            style={{
                background: "white",
                padding: "10px",
                border: "1px solid #ccc",
                cursor: "pointer",
            }}
        >
            <div>Country: {point.data.xFormatted}</div>
            <div>Population: {point.data.yFormatted}</div>
        </div>
    );

    console.log({ selectedPoints });

    // const debouncedHandlePointClick = debounce(handlePointClick, 250);
    return (
        <>
            <div className="h-56 cursor-pointer overflow-hidden">
                <ResponsiveLine
                    data={data}
                    margin={{ top: 50, right: 50, bottom: 15, left: 70 }}
                    xScale={{ type: "point" }}
                    yScale={{
                        type: "linear",
                        min: "auto",
                        max: "auto",
                        stacked: true,
                        reverse: false,
                    }}
                    curve="cardinal"
                    lineWidth={1}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={null}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend:
                            changeChartData === "population"
                                ? "Population"
                                : "Area",
                        legendOffset: -60,
                        legendPosition: "middle",
                        truncateTickAt: 0,
                        format: (value) => formatPopulation(value),
                    }}
                    gridXValues={12}
                    gridYValues={19}
                    enableGridX={false}
                    pointSize={5}
                    // pointColor="blue"
                    pointBorderWidth={1}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    enableTouchCrosshair={true}
                    colors={{ scheme: "category10" }}
                    // onClick={(point) =>
                    //     debouncedHandlePointClick(point as IClickedPoint)
                    // }

                    // pointSymbol={(e) => {
                    //     console.log({ e });
                    //     let colorPunto = "";
                    //     let colorBorde = "";

                    //     switch (e.datum.x) {
                    //         case "Eritrea":
                    //             colorPunto = e.datum.valueI
                    //                 ? "rgba(6,1,85,0.58)"
                    //                 : "red";
                    //             colorBorde = "rgb(6,1,85)";

                    //             break;
                    //         case "2":
                    //             colorPunto = e.datum.valueI
                    //                 ? "rgba(107,167,156,0.85)"
                    //                 : "white";
                    //             colorBorde = "rgba(42,146,77,1)";
                    //             break;
                    //     }

                    //     return (
                    //         <circle
                    //             cx="0"
                    //             cy="0"
                    //             r="5"
                    //             stroke={colorBorde}
                    //             strokeWidth="2"
                    //             fill={colorPunto}
                    //         />
                    //     );
                    // }}

                    pointSymbol={(e) => {
                        const isSelected = selectedPoints.some(
                            (selectedPoint) => selectedPoint.x === e.datum.x
                        );
                        const colorPunto = isSelected ? "red" : "blue";
                        const colorBorde = isSelected
                            ? "rgb(6,1,85)"
                            : "rgba(6,1,85,0.58)";

                        return (
                            <circle
                                cx="0"
                                cy="0"
                                r="5"
                                stroke={colorBorde}
                                strokeWidth="2"
                                fill={colorPunto}
                            />
                        );
                    }}
                    // pointColor={(point) => {
                    //     const isSelected = selectedPoints.some(
                    //         (selectedPoint) => selectedPoint.x === point.data.x
                    //     );
                    //     return isSelected ? "red" : "blue";
                    // }}
                    onClick={handlePointClick}
                    // pointColor={(point) => {
                    //     const isSelected = selectedPoints.some(
                    //         (selectedPoint) => {
                    //             return point.data.some(
                    //                 (p) => p.x === selectedPoint.x
                    //             );
                    //         }
                    //     );
                    //     return isSelected ? "red" : "blue";
                    // }}
                    // colors={["#00a9ff", "#ff0000"]}
                    onMouseEnter={(_datum, event) => {
                        (event.currentTarget as HTMLElement).style.cursor =
                            "pointer";
                    }}
                    useMesh={true}
                    // layers={[
                    //     "grid",
                    //     "markers",
                    //     "axes",
                    //     "areas",
                    //     "crosshair",
                    //     "lines",
                    //     "points",
                    //     ({ points }) => (
                    //         <g>
                    //             {points.map(
                    //                 (point: {
                    //                     id: string;
                    //                     x: number;
                    //                     y: number;
                    //                 }) => (
                    //                     <circle
                    //                         key={point.id}
                    //                         cx={point.x}
                    //                         cy={point.y}
                    //                         r={10}
                    //                         fill="transparent"
                    //                         className="cursor-pointer"
                    //                         onClick={() =>
                    //                             debouncedHandlePointClick(
                    //                                 point as IClickedPoint
                    //                             )
                    //                         }
                    //                     />
                    //                 )
                    //             )}
                    //         </g>
                    //     ),
                    // ]}
                    theme={{
                        crosshair: {
                            line: {
                                stroke: "#89a8ed",
                                strokeWidth: 1,
                                strokeDasharray: "2 2",
                            },
                        },
                        grid: {
                            line: {
                                strokeDasharray: "2 2",
                            },
                        },

                        background: "#EEEEEE",
                    }}
                    crosshairType="x"
                    tooltip={CustomTooltip}
                    // legends={[
                    //     {
                    //         anchor: "bottom-right",
                    //         direction: "column",
                    //         justify: false,
                    //         translateX: 100,
                    //         translateY: 0,
                    //         itemsSpacing: 0,
                    //         itemDirection: "left-to-right",
                    //         itemWidth: 80,
                    //         itemHeight: 20,
                    //         itemOpacity: 0.75,
                    //         symbolSize: 12,
                    //         symbolShape: "circle",
                    //         symbolBorderColor: "rgba(0, 0, 0, .5)",
                    //         effects: [
                    //             {
                    //                 on: "hover",
                    //                 style: {
                    //                     itemBackground: "rgba(0, 0, 0, .03)",
                    //                     itemOpacity: 1,
                    //                 },
                    //             },
                    //         ],
                    //     },
                    // ]}
                />
            </div>

            <div className="my-5 border border-teal-500 flex flex-wrap items-start justify-start gap-6">
                {selectedPoints.length > 0 &&
                    selectedPoints?.map((selectedPoint, i) => (
                        <div
                            key={selectedPoint.x + i}
                            className="border border-slate-400 bg-slate-200 "
                        >
                            <h2>Data for Point</h2>
                            <p>Country : {selectedPoint.x}</p>
                            <p>Y: {formatPopulation(selectedPoint.y)}</p>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default AppChart;
