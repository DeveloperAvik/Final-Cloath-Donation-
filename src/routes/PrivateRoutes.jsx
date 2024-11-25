import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider"; 

const PrivateRoute = ({ element: Component, ...rest }) => {
    const { user } = useContext(AuthContext); 

    return (
        <Route
            {...rest}
            element={user ? <Component /> : <Navigate to="/auth/login" replace />}
        />
    );
};

export default PrivateRoute;
