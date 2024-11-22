import { useEffect, useState } from "react";
import "./style.css";

type TodoType = {
    id: number,
    desc: string,
    status: "in-schedule"|"in-process"|"done"
}

function DraggableCards() {
    const [todos, setTodos] = useState<TodoType[]>([]);
    useEffect(() => {
        const getTodos = async () => {
            try {
                const response = await fetch("/fake-data/todos.json");
                if (response.ok) {
                    const data = await response.json();
                    setTodos(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getTodos();
    }, []);
    // 
    const inSchedule = todos.filter(todo => todo.status === "in-schedule");
    const inProcess = todos.filter(todo => todo.status === "in-process");
    const done = todos.filter(todo => todo.status === "done");
    // 
    let draggableId: number;
    function dragStartHandler(todo: TodoType) {
        draggableId = todo.id;
    }

    function handleDragOver(evt: React.DragEvent) {
        evt.preventDefault();
    }

    function handleDrop(evt: React.DragEvent<HTMLElement>) {
        evt.preventDefault();
        let container = evt.target as HTMLElement;
        while(!container.dataset.status) {
            if (container.parentElement) {
                container = container.parentElement
            } else {
                break;
            }
        }
        
        
        const newStatus = container.dataset.status as TodoType["status"];
        setTodos(todos.map(todo => todo.id === draggableId ? {...todo, status: newStatus} : todo));
    }

    return (
        <div className="dashboard">
            <h4 className="dashboard__title">My todos</h4>
            <div className="dashboard__in-schedule" onDrop={handleDrop}  onDragOver={handleDragOver} data-status="in-schedule">
                <h6 className="dashboard__group-title">In schedule</h6>
                <ul className="dashboard__list">
                    {
                        inSchedule.map(todo => <li className="dashboard__element" key={todo.id} draggable onDragStart={() => {dragStartHandler(todo)}}>{todo.desc}</li>)
                    }
                </ul>
            </div>
            <div className="dashboard__in-process" onDrop={handleDrop}  onDragOver={handleDragOver} data-status="in-process">
                <h6 className="dashboard__group-title">In process</h6>
                <ul className="dashboard__list">
                    {
                        inProcess.map(todo => <li className="dashboard__element dashboard__element_in-process" key={todo.id} draggable onDragStart={() => {dragStartHandler(todo)}}>{todo.desc}</li>)
                    }
                </ul>
            </div>
            <div className="dashboard__done" onDrop={handleDrop}  onDragOver={handleDragOver} data-status="done">
                <h6 className="dashboard__group-title">Done</h6>
                <ul className="dashboard__list">
                    {
                        done.map(todo => <li className="dashboard__element dashboard__element_done" key={todo.id} draggable onDragStart={() => {dragStartHandler(todo)}}>{todo.desc}</li>)
                    }
                </ul>
            </div>
        </div>
    )
};

export default DraggableCards;