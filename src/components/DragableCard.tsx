import React, { useEffect } from "react";
import CountryDetailsCard from "./CountryDetailsCard";
import { ICountryDatum } from "@/types/Country";
import { DragDropContext, Draggable, DropResult } from "@hello-pangea/dnd";
import CustomDroppableComponent from "./common/CustomDroppableComponent";

interface IProps {
    selectedPoints: ICountryDatum[];
    updateSelectedPoints: (points: ICountryDatum[]) => void;
}
const DragableCard = ({ selectedPoints, updateSelectedPoints }: IProps) => {
    const [points, setPoints] = React.useState<ICountryDatum[]>(selectedPoints);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const newOrder = Array.from(points);
        const [movedItem] = newOrder.splice(result.source.index, 1);
        newOrder.splice(result.destination.index, 0, movedItem);

        setPoints(newOrder);
        updateSelectedPoints(newOrder); // Update selectedPoints in the parent component
    };

    useEffect(() => {
        setPoints(selectedPoints);
    }, [selectedPoints]);

    console.log({ points });
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <CustomDroppableComponent droppableId="droppable">
                <div className="flex p-3 items-start justify-evenly flex-wrap gap-4 rounded-lg ">
                    {points.length > 0
                        ? points.map((selectedPoint, i) => (
                              <Draggable
                                  key={selectedPoint.x + i}
                                  draggableId={selectedPoint.x + i}
                                  index={i}
                              >
                                  {(provided) => (
                                      <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          className=""
                                      >
                                          <CountryDetailsCard
                                              countryDetails={selectedPoint}
                                          />
                                      </div>
                                  )}
                              </Draggable>
                          ))
                        : "No selected points."}
                </div>
            </CustomDroppableComponent>
        </DragDropContext>
    );
};

export default DragableCard;
