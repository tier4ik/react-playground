import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <Link to={"/"} >Return to Home</Link>   
            </div>
        </footer>
    )
}

export default Footer;