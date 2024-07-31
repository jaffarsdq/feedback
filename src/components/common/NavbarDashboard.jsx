import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    logout,
    resetAuthState,
    setClientId,
    setImageFileUrl,
} from '../../Redux/Slices/AuthSlice';
import AlertPop from './AlertPop';
import { setAppBaseURL } from '../../config/axiosInstance';

function NavbarDashboard({ toggle }) {
    // const location = useLocation();
    // const path = location.pathname;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    const [alertMsg, setAlertMsg] = useState({
        alert: false,
        message: '',
        status: '',
    });
    const { alert, message, status } = alertMsg;

    useEffect(() => {
        // Function to update the date and time
        const updateDateTime = () => {
            setCurrentDateTime(new Date());
        };

        // Update time every minute
        const intervalId = setInterval(updateDateTime, 60000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const formattedDate = useMemo(() => {
        const now = currentDateTime;

        // Extract day, month, year, and time components
        const day = now.toLocaleDateString('en-GB', { day: '2-digit' });
        const month = now.toLocaleDateString('en-GB', { month: 'long' });
        const year = now.toLocaleDateString('en-GB', { year: 'numeric' });
        const time = now.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });

        // Format date and time as "10 June 2024, 10:12 PM"
        return `${day} ${month} ${year}, ${time}`;
    }, [currentDateTime]);

    const { NAME, USER_TYPE, PROFILE_IMAGE } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        const imageURL = sessionStorage.getItem('FileURL');
        const AppBaseURL = sessionStorage.getItem('AppBaseURL');
        const client_id = sessionStorage.getItem('client_id');

        if (
            imageURL &&
            AppBaseURL &&
            imageURL !== 'undefined' &&
            AppBaseURL !== 'undefined'
        ) {
            dispatch(setClientId(client_id));
            dispatch(setImageFileUrl(imageURL));
        }

        if (!imageURL || !AppBaseURL) {
            navigate('/');
            dispatch(resetAuthState());
            dispatch(logout());
            sessionStorage.clear();
            sessionStorage.clear();
            setAppBaseURL(client_id);
            setAlertMsg({
                alert: true,
                message:
                    'Failed to connect, Please check your app configuration',
                status: 'error',
            });

            setTimeout(() => {
                setAlertMsg({
                    alert: false,
                    message: '',
                    status: '',
                });
            }, 2000);
        }
    }, []);

    const handleLogout = () => {
        navigate('/');
        dispatch(logout());
    };

    return (
        <Box
            sx={{
                background:
                    'linear-gradient(240deg, #35174C 5.9%, #7C37B2 98.4%)',
                boxShadow:
                    '0 1px 2px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.1)',
                zIndex: 10,
                height: '55px',
                width: '100%',
                position: 'relative',
            }}
        >
            {alert && (
                <AlertPop boolean={alert} msg={message} status={status} />
            )}
            <Box
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    padding: '10px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: 'inherit',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                    }}
                >
                    <Typography
                        variant='body1'
                        sx={{
                            marginLeft: '15px',
                            marginRight: {
                                xs: '0rem',
                                sm: '0.5rem',
                                md: '1rem',
                            },
                            color: 'white',
                            fontFamily: 'Ubuntu',
                            fontSize: { xs: '12px', sm: '15px' },
                            fontStyle: 'normal',
                            fontWeight: '700',
                            flexWrap: 'wrap',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                        }}
                    >
                        {'ABC Restaurant'}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                    }}
                >
                    <Box
                        sx={{
                            fontFamily: 'Poppins',
                            color: '#151D48',
                            display: { xs: 'flex' },
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '1rem',
                                fontWeight: '900',
                                fontSize: {
                                    xs: '9px',
                                    sm: '10px',
                                    md: '12px',
                                    lg: '13px',
                                },
                                color: 'white',
                            }}
                        >
                            {formattedDate}
                        </Box>
                        <LogoutIcon
                            sx={{
                                color: 'white',
                                cursor: 'pointer',
                                display: 'none',
                            }}
                            onClick={handleLogout}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default NavbarDashboard;
