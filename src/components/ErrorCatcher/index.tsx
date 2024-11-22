import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ErrorCatcher() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/error")
    }, [])
    return null;
}

export default ErrorCatcher;