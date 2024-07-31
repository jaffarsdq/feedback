import { useSelector } from 'react-redux';
import './App.css';
import SnackbarNotification from './components/common/SnackbarNotification';
import MainRoutes from './Routes/MainRoutes';
import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';

function App() {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn && location.pathname === '/') navigate('/Feedback');
        else navigate('/');
    }, [isLoggedIn]);
    return (
        <>
            <MainRoutes />
            <SnackbarNotification />
        </>
    );
}

export default App;
