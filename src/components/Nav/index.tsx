import { NavLink } from "react-router-dom";

function Nav() {
    return (
        <nav className="nav">
            <p className="nav__title">Projects</p>
            <ul className="nav__menu">
                <li className="nav__element">
                    <NavLink
                        to="/drag-and-drop"
                        className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        Drag-And-Drop
                    </NavLink>
                </li>
                <li className="nav__element">
                    <NavLink
                        to="/draggable-cards"
                        className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        Draggable Cards
                    </NavLink>
                </li>
                <li className="nav__element">
                    <NavLink
                        to="/holidays"
                        className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        Holidays
                    </NavLink>
                </li>
                <li className="nav__element">
                    <NavLink
                        to="/pomodoro"
                        className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        Pomodoro
                    </NavLink>
                </li>
                <li className="nav__element">
                    <NavLink
                        to="/pokemon"
                        className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        Pokemon List
                    </NavLink>
                </li>
                <li className="nav__element">
                    <NavLink
                        to="/memory-game"
                        className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                        }
                    >
                        Memory Game
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;