import React, { useEffect } from "react";
import CountryDetailsCard from "./CountryDetailsCard";
import { ICountryDatum } from "@/types/Country";
import { DragDropContext, Draggable, DropResult } from "@hello-pangea/dnd";
import CustomDroppableComponent from "./common/CustomDroppableComponent";

interface IProps {
    selectedPoints: ICountryDatum[];
}
const DragableCard = ({ selectedPoints }: IProps) => {
    const [points, setPoints] = React.useState(selectedPoints || []); // use state to keep track of points

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        console.log({ points });

        const items = Array.from(points);
        const [reorderedItem] = items.splice(result.source.index, 1);

        items.splice(result.destination.index, 0, reorderedItem);

        setPoints(items);
    };

    useEffect(() => {
        setPoints(selectedPoints || []);
    }, [selectedPoints]);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <CustomDroppableComponent droppableId="droppable">
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
                                  >
                                      <CountryDetailsCard
                                          countryDetails={selectedPoint}
                                      />
                                  </div>
                              )}
                          </Draggable>
                      ))
                    : "No selected points."}
            </CustomDroppableComponent>
        </DragDropContext>
    );
};

export default DragableCard;
