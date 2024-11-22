import { Outlet } from "react-router-dom";
import Nav from "../Nav";

function Main() {
    return (
        <main className="main">
            <div className="container main__inner-container">
                <Nav />
                <div className="view">
                    <Outlet />
                </div>
            </div>
        </main>
    )
}

export default Main;