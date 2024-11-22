import { forwardRef } from "react";

const DragAndDropDraggable = forwardRef(({top, left} : {top: number, left: number}, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
            <div
                className="drag-and-drop__draggable"
                ref={ref}
                style={{left: `${left}px`, top: `${top}px`}}>
                Drag Me
            </div>
        )
});  

export default DragAndDropDraggable;