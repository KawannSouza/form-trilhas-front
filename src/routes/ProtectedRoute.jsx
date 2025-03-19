import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children }) {
    const { user } = useAuth();
    const location = useLocation();

    if(!user) {
        return <Navigate to="/" replace state={{ from: location }}/>;
    }

    return children;
}