import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Auth/Login";
import FeedBack from "../Pages/FeedBack";

const MainRoutes = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    if (isLoggedIn) {
        return (
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Feedback" element={<FeedBack />} />
            </Routes>
        );
    } else {
        return (
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="*" element={<Login />} />
            </Routes>
        );
    }
};

export default MainRoutes;
