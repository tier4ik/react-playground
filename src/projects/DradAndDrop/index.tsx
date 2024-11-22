import { useState, useEffect, useRef } from "react";

import DragAndDropField from "./DragAndDrop__Field";
import DragAndDropDraggable from "./DragAndDrop__Draggable";

import "./style.css";

function DragAndDrop() {
    const draggableRef = useRef<HTMLDivElement>(null);
    const fieldRef = useRef<HTMLDivElement>(null);
    let [coords, setCoords] = useState([100, 150]);
    let draggableEl: HTMLDivElement;
    let fieldEl: HTMLDivElement;
    let fieldCoord: DOMRect;
    let mouseOffset: [number, number];

    function handleMousemove(evt: MouseEvent) {
        let left = evt.clientX - fieldCoord.left - mouseOffset[0];
        let top = evt.clientY - fieldCoord.top - mouseOffset[1];
        
        if (left <= 0) {
            left = 0
        }
        if (fieldCoord.left + left + draggableEl.offsetWidth >= fieldCoord.right) {
            left = fieldCoord.right - fieldCoord.left - draggableEl.offsetWidth;
        }
        if (top <= 0) {
            top = 0
        }
        if (fieldCoord.top + top + draggableEl.offsetWidth >= fieldCoord.bottom) {
            top = fieldCoord.bottom - fieldCoord.top - draggableEl.offsetWidth;
        }
        setCoords([left, top]);
    };

    function handleMouseup() {
        window.removeEventListener("mousemove", handleMousemove);
        window.removeEventListener("mouseup", handleMouseup);
    }

    function handleMouseDown(evt: MouseEvent) {
        mouseOffset = [evt.offsetX, evt.offsetY];
        window.addEventListener("mousemove", handleMousemove);
        window.addEventListener("mouseup", handleMouseup);
    };

    function resetCoords() {
        fieldCoord = fieldRef.current!.getBoundingClientRect();
    }

    useEffect(() => {
        draggableEl = draggableRef.current!;
        fieldEl = fieldRef.current!;
        fieldCoord = fieldEl.getBoundingClientRect();
        draggableEl.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("resize", resetCoords);
        return () => {
            draggableEl.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("resize", resetCoords);
            window.removeEventListener("mousemove", handleMousemove);
            window.removeEventListener("mouseup", handleMouseup);
        }
    }, [])
    
    return (
        <div className="drag-and-drop">
            <DragAndDropField ref={fieldRef}>
                <DragAndDropDraggable ref={draggableRef} left={coords[0]} top={coords[1]}/>
            </DragAndDropField>
        </div>
    )
}

export default DragAndDrop;