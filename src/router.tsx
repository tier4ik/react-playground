import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import ErrorCatcher from "./components/ErrorCatcher";
import DragAndDrop from "./projects/DradAndDrop";
import Error from "./components/Error";
import DraggableCards from "./projects/DraggableCards";
import Holidays from "./projects/Holidays";
import Pomodoro from "./projects/Pomodoro";
import Pokemon from "./projects/PokemonList";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorCatcher />,
        children: [
            {
                path: "drag-and-drop",
                element: <DragAndDrop />
            },
            {
                path: "draggable-cards",
                element: <DraggableCards />
            },
            {
                path: "holidays",
                element: <Holidays />
            },
            {
                path: "pomodoro",
                element: <Pomodoro />
            },
            {
                path: "pokemon",
                element: <Pokemon />
            },
            {
                path: "error",
                element: <Error />
            }
        ]
    }
]);