import { formatPopulation } from "@/lib/formatNumber";
import { PointTooltipProps, ResponsiveLine } from "@nivo/line";
import { useState } from "react";
import { customColors } from "@/lib/customColors";
import { hexToRgba } from "@/lib/hexToRgba";

interface IDataPoint {
    x: string;
    y: number;
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

    const handlePointClick = (point) => {
        console.log("HandlePointclick", point);

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
    const CustomTooltip = ({ point }: PointTooltipProps) => {
        console.log("cusotmtooltip", { point });
        return (
            <div className="shadow-md py-3 px-4  bg-slate-50 rounded-md">
                <table className="table-fixed">
                    <tbody>
                        <tr className="text-sm font-semibold text-[#0f172a]">
                            <td className="pr-1">Country </td>
                            <td>: {point.data.xFormatted} </td>
                        </tr>
                        <tr className="text-slate-500 text-sm font-semibold">
                            <td className="pr-1">{point.serieId} </td>
                            <td>
                                :{" "}
                                {formatPopulation(
                                    parseInt(point.data.yFormatted as string)
                                )}{" "}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };

    console.log({ selectedPoints });
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
                    pointSymbol={(e) => {
                        const isSelected = selectedPoints.some(
                            (selectedPoint) => selectedPoint.x === e.datum.x
                        );

                        const color = isSelected
                            ? customColors[
                                  selectedPoints.findIndex(
                                      (p) => p.x === e.datum.x
                                  )
                              ]
                            : "blue";
                        return (
                            <circle
                                cx="0"
                                cy="0"
                                r="3"
                                stroke={
                                    isSelected ? hexToRgba(color, 0.54) : "blue"
                                }
                                strokeWidth={isSelected ? "5" : "1"}
                                fill={color}
                            />
                        );
                    }}
                    onClick={handlePointClick}
                    onMouseEnter={(_datum, event) => {
                        (event.currentTarget as HTMLElement).style.cursor =
                            "pointer";
                    }}
                    useMesh={true}
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

                        background: "white",
                    }}
                    crosshairType="x"
                    tooltip={CustomTooltip}
                    legends={
                        [
                            // {
                            //     anchor: "bottom-right",
                            //     direction: "column",
                            //     justify: false,
                            //     translateX: 100,
                            //     translateY: 0,
                            //     itemsSpacing: 0,
                            //     itemDirection: "left-to-right",
                            //     itemWidth: 80,
                            //     itemHeight: 20,
                            //     itemOpacity: 0.75,
                            //     symbolSize: 12,
                            //     symbolShape: "circle",
                            //     symbolBorderColor: "rgba(0, 0, 0, .5)",
                            //     effects: [
                            //         {
                            //             on: "hover",
                            //             style: {
                            //                 itemBackground: "rgba(0, 0, 0, .03)",
                            //                 itemOpacity: 1,
                            //             },
                            //         },
                            //     ],
                            // },
                        ]
                    }
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
