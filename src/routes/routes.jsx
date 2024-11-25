import { createBrowserRouter, Navigate } from "react-router-dom";
import HomeLayouts from "../layouts/HomeLayouts";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../components/About";
import Works from "../components/Works";
import ContactUs from "../components/ContactUs";
import Vision from "../components/Vision";
import ErrorPage from "../components/ErrorPage";
import Donation from "../components/Donation";  
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider"; 
import Home from "../components/Home";
import Dashboard from "../components/Dashboard";


const PrivateRoute = ({ element }) => {
    const { user } = useContext(AuthContext);  
    return user ? element : <Navigate to="/auth/login" replace />;
};

const routers = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayouts />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/works',
                element: <Works />
            },
            {
                path: '/contactus',
                element: <ContactUs />
            },
            {
                path: '/vision',
                element: <Vision />
            },
            // Protected route
            {
                path: '/donation',
                element: <PrivateRoute element={<Donation />} /> 
            },
            {
                path: '/dashboard',
                element: <PrivateRoute element={<Dashboard />} /> 
            },
        ]
    },
    {
        path: "/auth",
        element: <AuthLayouts />,
        children: [
            {
                path: "/auth/login",
                element: <Login />
            },
            {
                path: "/auth/register",
                element: <Register />
            }
        ]
    },
    {
        path: "*",
        element: <ErrorPage />
    }
]);

export default routers;
