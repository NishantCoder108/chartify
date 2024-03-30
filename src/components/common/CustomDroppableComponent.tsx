import {
    Droppable,
    DroppableProvided,
    DroppableStateSnapshot,
} from "@hello-pangea/dnd";
import React, { ReactNode } from "react";

interface CustomDroppableComponentProps {
    children: ReactNode;
    droppableId: string;
}

const CustomDroppableComponent: React.FC<CustomDroppableComponentProps> = ({
    children,
    droppableId,
}) => {
    return (
        <Droppable droppableId={droppableId} direction="horizontal">
            {(
                provided: DroppableProvided,
                snapshot: DroppableStateSnapshot
            ) => (
                <div
                    ref={provided.innerRef}
                    style={{
                        backgroundColor: snapshot.isDraggingOver
                            ? "blue"
                            : "grey",
                    }}
                    {...provided.droppableProps}
                >
                    {children}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default CustomDroppableComponent;
