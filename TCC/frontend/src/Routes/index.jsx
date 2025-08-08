import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "../Pages/Auth";
import Home from '../Pages/Home'
import NotFound from "../Pages/NotFound";
import Gallery from "../Pages/Gallery"
import Config from "../Pages/Config";
import Employe from "../Pages/Config/Employe";
import Cart from "../Pages/Cart";
import Stock from "../Pages/Config/Stock";
import History from "../Pages/Config/History";
import Profile from "../Pages/Config/Profile";
import Landing from "../Pages/Landing";
import PrivateRoute from "./PrivateRoute";
import AuthCallback from "../Components/AuthCallBack";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/Gallery" element={
                <PrivateRoute>
                    <Gallery />
                </PrivateRoute>
            } />
            <Route path="/Cart" element={
                <PrivateRoute>
                    <Cart />
                </PrivateRoute>
            } />
            <Route path="/Config" element={
                <PrivateRoute>
                    <Config />
                </PrivateRoute>
            }>
                <Route index element={<Navigate to="Stock" replace />} />
                <Route path="Employe" element={<Employe />} />
                <Route path="Stock" element={<Stock />} />
                <Route path="History" element={<History />} />
                <Route path="Profile" element={<Profile />} />
            </Route>
            <Route path="/Home" element={
                <PrivateRoute>
                    <Home />
                </PrivateRoute>
            } />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;
