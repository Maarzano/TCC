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

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/Gallery" element={<Gallery/>} />
            <Route path="/Cart" element={<Cart/>} />
            <Route path="/Config" element={<Config/>} >
                <Route index element={<Navigate to="Stock" replace />} />
                <Route path="Employe" element={<Employe/>} />
                <Route path="Stock" element={<Stock/>} />
                <Route path="History" element={<History/>} />
                <Route path="Profile" element={<Profile/>} />
            </Route>
            <Route path="/Home" element={<Home/>} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
    )
}

export default AppRoutes;