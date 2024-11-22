import { useLocation } from "react-router-dom";

function Header() {
    const {pathname} = useLocation();
    const title = pathname === "/" ? "Home Page" : pathname.slice(1).replace(/-/g, " ");
    return (
        <header className="header">
            <div className="container">
                <span className="header__title">{title}</span>
            </div>
        </header>
    )
}

export default Header;