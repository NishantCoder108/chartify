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
                    className={
                        snapshot.isDraggingOver ? "bg-slate-200" : "bg-slate-50"
                    }
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
