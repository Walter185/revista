import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/context";

const RequireAuth = ({ children }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" />
    }
    return children;
}

export default RequireAuth;