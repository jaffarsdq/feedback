import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    OutlinedInput,
    TextField,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, setClientId } from '../../Redux/Slices/AuthSlice';
import bgImage from '../../assets/bg-img.png';
import trueValue from '../../assets/trueValue.png';
import { setAppBaseURL } from '../../config/axiosInstance';

function UserLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loadingLogin, login_status, triggered } = useSelector(
        (state) => state.auth
    );
    const [showPassword, setShowPassword] = useState(false);
    const [formDetails, setFormDetails] = useState({});
    // const [selectedRole, setSelectedRole] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const [loginMsg, setLoginMsg] = useState('');
    const showErrorMsg = (message) => {
        setLoginMsg(message);
        // Set a timeout to remove the error message after 5 seconds
        setTimeout(() => {
            setLoginMsg('');
        }, 5000);
    };

    // const { CLIENT_ID } = useSelector((state) => state.auth);
    useEffect(() => showErrorMsg(login_status), [triggered]);

    const validateForm = () => {
        const errors = {};

        if (!formDetails.CLIENT_ID) {
            errors.CLIENT_ID = 'Client Id is required';
        } else if (formDetails.CLIENT_ID.length < 5) {
            errors.CLIENT_ID = 'Client Id is not valid';
        } else {
            delete errors.CLIENT_ID;
        }

        if (!formDetails.user_name) {
            errors.user_name = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formDetails.user_name)) {
            errors.user_name = 'Email is not valid';
        } else {
            delete errors.user_name;
        }

        if (!formDetails.password) {
            errors.password = 'Password is required';
        } else if (formDetails.password.length < 2) {
            errors.password =
                'Password must be at least 2 characters with a special character';
        } else {
            delete errors.password;
        }

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormDetails({ ...formDetails, [name]: value });

        const errors = { ...validationErrors };

        if (name === 'user_name') {
            if (!value) {
                errors.user_name = 'Email is required';
            } else if (!/^\S+@\S+\.\S+$/.test(value)) {
                errors.user_name = 'Email is not valid';
            } else {
                delete errors.user_name;
            }
        } else if (name === 'password') {
            if (!value) {
                errors.password = 'Password is required';
            } else if (value.length < 2) {
                errors.password =
                    'Password must be atleast 2 characters with a special character';
            } else {
                delete errors.password;
            }
        } else if (name === 'CLIENT_ID') {
            if (!value) {
                errors.CLIENT_ID = 'Client Id is required';
            } else if (value.length < 5) {
                errors.CLIENT_ID = 'Client Id must be atleast 5 characters';
            } else {
                delete errors.CLIENT_ID;
            }
        }
        setValidationErrors(errors);
    };

    const onFormSubmit = async () => {
        if (validateForm()) {
            dispatch(setClientId(formDetails.CLIENT_ID));
            setFormDetails({ ...formDetails });
            console.log({
                ...formDetails,
                AUTH_KEY: 'TXlDb206TG95QVBJMTIz',
                CLIENT_ID: formDetails.CLIENT_ID,
            });

            // Set base URL before making the API call
            await setAppBaseURL(formDetails.CLIENT_ID);

            // Confirm that the base URL has been set
            console.log('Base URL set successfully.');

            // Make the login API call
            await dispatch(
                fetchLogin({
                    ...formDetails,
                    AUTH_KEY: 'TXlDb206TG95QVBJMTIz',
                })
            );

            // Navigate to dashboard or other success action
            // navigate("/dashboard");
        }
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (e) => e.preventDefault();

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'Inter',
                backgroundColor: '#F7FAFC',
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Login wrapper */}
            <Box
                sx={{
                    width: { xs: '280px', sm: '350px', lg: '410px' },
                    zIndex: '100',
                    margin: '0',
                    padding: '0',
                }}
            >
                {/* card box wrapper */}
                <Box
                    sx={{
                        width: { xs: '280px', sm: '350px', lg: '400px' },
                        // margin: "2rem auto 2.5rem",
                        display: 'flex',
                        flexDirection: 'column',
                        // justifyContent: "space-around",
                        alignItems: 'center',
                        // minHeight: "400px",
                        boxShadow: '0 3px 10px rgb(0 0 0 / 0.3)',
                        padding: '0.2rem',
                        background: 'white',
                        color: '#3C4257',
                        borderRadius: '12px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            width: '85%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1.5rem 0 0.5rem 0',
                        }}
                    >
                        <Box
                            sx={{
                                fontSize: '12px',
                                fontWeight: '500',
                                alignSelf: 'start',
                                width: '85%',
                                background: 'white',
                                margin: '0 auto',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '20px',
                                    fontWeight: '700',
                                }}
                                color='secondary'
                            >
                                Hi, <span>Welcome Back !</span>
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                }}
                            >
                                Loign to your account
                            </Typography>
                        </Box>
                        <Box sx={{ width: { xs: '65px', md: '95' } }}>
                            <img
                                src={trueValue}
                                alt='app logo'
                                width={'100%'}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ width: '85%', marginTop: '20px' }}>
                        <FormControl variant='standard' sx={{ width: '100%' }}>
                            <Typography
                                fontSize={'12px'}
                                variant='p'
                                component='p'
                                fontWeight={700}
                                sx={{ opacity: '95%' }}
                            >
                                Client Id
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    border: '1px solid rgba(128,128,128,0.3)',
                                    borderRadius: '4px',
                                    height: '40px',
                                    marginTop: '8px',
                                }}
                            >
                                <OutlinedInput
                                    onChange={handleInputChange}
                                    name='CLIENT_ID'
                                    type='text'
                                    value={formDetails.CLIENT_ID}
                                    sx={{
                                        '& fieldset': { border: 'none' },
                                        flexBasis: '100%',
                                        '.MuiInputBase-input': {
                                            height: '5px',
                                        },
                                    }}
                                    InputProps={{
                                        style: {
                                            fontSize: '14px',
                                            fontWeight: '500',
                                        },
                                    }}
                                    fontSize={'12px'}
                                    placeholder='client id'
                                    inputProps={{
                                        maxLength: 10,
                                        minLength: 2,
                                    }}
                                />
                            </Box>
                            {validationErrors.CLIENT_ID ? (
                                <Typography
                                    variant='p'
                                    component='p'
                                    sx={{
                                        height: '16px',
                                        color: 'red',
                                        fontSize: '11px',
                                        marginTop: '5px',
                                    }}
                                >
                                    {validationErrors.CLIENT_ID}
                                </Typography>
                            ) : (
                                <Typography
                                    sx={{
                                        height: '16px',
                                        color: 'red',
                                        fontSize: '12px',
                                        marginTop: '5px',
                                    }}
                                ></Typography>
                            )}
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '85%' }}>
                        <FormControl variant='standard' sx={{ width: '100%' }}>
                            <Typography
                                fontSize={'12px'}
                                variant='p'
                                component='p'
                                fontWeight={700}
                                sx={{ opacity: '95%' }}
                            >
                                Email Address
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    border: '1px solid rgba(128,128,128,0.3)',
                                    borderRadius: '4px',
                                    height: '40px',
                                    marginTop: '8px',
                                }}
                            >
                                <TextField
                                    onChange={handleInputChange}
                                    name='user_name'
                                    type='email'
                                    value={formDetails.user_name}
                                    sx={{
                                        '& fieldset': { border: 'none' },
                                        flexBasis: '100%',
                                        '.MuiInputBase-input': {
                                            height: '5px',
                                        },
                                    }}
                                    InputProps={{
                                        style: {
                                            fontSize: '14px',
                                            fontWeight: '500',
                                        },
                                    }}
                                    fontSize={'12px'}
                                    placeholder='jane.doe@gmail.com'
                                    inputProps={{
                                        maxLength: 50,
                                        minLength: 2,
                                    }}
                                />
                            </Box>
                            {validationErrors.user_name ? (
                                <Typography
                                    variant='p'
                                    component='p'
                                    sx={{
                                        height: '16px',
                                        color: 'red',
                                        fontSize: '11px',
                                        marginTop: '5px',
                                    }}
                                >
                                    {validationErrors.user_name}
                                </Typography>
                            ) : (
                                <Typography
                                    sx={{
                                        height: '16px',
                                        color: 'red',
                                        fontSize: '12px',
                                        marginTop: '5px',
                                    }}
                                ></Typography>
                            )}
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '85%' }}>
                        <FormControl variant='standard' sx={{ width: '100%' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                }}
                            >
                                <Typography
                                    fontSize={'12px'}
                                    variant='p'
                                    component='p'
                                    fontWeight={700}
                                    sx={{ opacity: '95%' }}
                                >
                                    Password
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%',
                                    border: '1px solid rgba(128,128,128,0.3)',
                                    borderRadius: '4px',
                                    height: '40px',
                                    marginTop: '8px',
                                }}
                            >
                                <TextField
                                    onChange={handleInputChange}
                                    name='password'
                                    value={formDetails.password}
                                    type={showPassword ? 'text' : 'password'}
                                    sx={{
                                        '& fieldset': { border: 'none' },
                                        flexBasis: '100%',
                                        '.MuiInputBase-input': {
                                            height: '5px',
                                        },
                                    }}
                                    InputProps={{
                                        style: {
                                            fontSize: '14px',
                                            fontWeight: '500',
                                        },
                                    }}
                                    placeholder='password'
                                />
                                <Box
                                    sx={{
                                        alignSelf: 'center',
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? (
                                        <Visibility
                                            sx={{
                                                opacity: '50%',
                                                height: '16px',
                                                marginRight: '10px',
                                                marginTop: '3px',
                                                '&:hover': {
                                                    opacity: '70%',
                                                },
                                            }}
                                        />
                                    ) : (
                                        <VisibilityOff
                                            sx={{
                                                opacity: '50%',
                                                height: '16px',
                                                marginRight: '10px',
                                                marginTop: '3px',
                                                '&:hover': {
                                                    opacity: '70%',
                                                },
                                            }}
                                        />
                                    )}
                                </Box>
                            </Box>
                            {validationErrors.password ? (
                                <Typography
                                    variant='p'
                                    component='p'
                                    sx={{
                                        height: '15px',
                                        color: 'red',
                                        fontSize: '11px',
                                        marginTop: '5px',
                                    }}
                                >
                                    {validationErrors.password}
                                </Typography>
                            ) : (
                                <Typography
                                    sx={{
                                        height: '15px',
                                        color: 'red',
                                        fontSize: '11px',
                                        marginTop: '5px',
                                    }}
                                ></Typography>
                            )}
                        </FormControl>
                    </Box>
                    <Box
                        sx={{
                            width: '85%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            padding: '1rem 0 1rem 0',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                                padding: '0 0 5px 0',
                                alignItems: 'center',
                            }}
                        >
                            <FormGroup
                                sx={{
                                    // display: "flex",
                                    // justifyContent: "space-between",
                                    // flexDirection: "row",
                                    fontSize: '5px',
                                    '&:hover': {
                                        cursor: 'pointer',
                                    },
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            sx={{
                                                color: '#9C27B0',
                                                '&.Mui-checked': {
                                                    color: '#9C27B0',
                                                },
                                            }}
                                            checked={
                                                formDetails.user_type === 'user'
                                            }
                                            onChange={handleInputChange}
                                            value='user'
                                            name='user_type'
                                        />
                                    }
                                    label={
                                        <Typography
                                            sx={{
                                                fontSize: '12px',
                                                marginTop: '2px',
                                                fontWeight: '500',
                                                opacity: '95%',
                                            }}
                                        >
                                            Keep me logged in
                                        </Typography>
                                    }
                                    sx={{
                                        '& .MuiSvgIcon-root': {
                                            fontSize: {
                                                xs: '12px',
                                                sm: '12px',
                                                md: '16px',
                                                lg: '16px',
                                            },
                                        },
                                    }}
                                />
                            </FormGroup>
                            <Typography
                                fontSize={{ xs: '10px', md: '12px' }}
                                variant='p'
                                sx={{ color: '#9c27b0', fontWeight: '600' }}
                                component='p'
                            >
                                Forgot password?
                            </Typography>
                        </Box>
                        {loginMsg ? (
                            <Typography
                                variant='p'
                                component='p'
                                sx={{
                                    height: '15px',
                                    color: 'red',
                                    fontSize: '14px',
                                    marginBottom: '5px',
                                }}
                            >
                                {loginMsg}
                            </Typography>
                        ) : (
                            <Typography
                                sx={{
                                    height: '15px',
                                    color: 'red',
                                    fontSize: '11px',
                                    // marginBottom: "5px",
                                    // marginBottom: "5px",
                                }}
                            ></Typography>
                        )}
                        <LoadingButton
                            onClick={onFormSubmit}
                            variant='contained'
                            loadingPosition='start'
                            loading={loadingLogin}
                            sx={{
                                bgcolor: '#9c27b0',
                                width: '100%',
                                textTransform: 'capitalize',
                                letterSpacing: '1px',
                                fontWeight: '500',
                                '&:hover': {
                                    bgcolor: '#9c27b0',
                                    backgroundColor: '#9c27b0',
                                    boxShadow: 'none',
                                    cursor: 'pointer',
                                },
                                '&:active': {
                                    boxShadow: 'none',
                                    backgroundColor: '#9c27b0',
                                },
                            }}
                        >
                            {loadingLogin ? 'Signing In' : 'Sign In'}
                        </LoadingButton>
                    </Box>
                    <Box
                        sx={{
                            width: '85%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                borderTop: '1px solid gray',
                                height: '1px',
                                width: '100%',
                                opacity: '20%',
                            }}
                        ></Box>
                        <Typography
                            fontSize={{ xs: '10px', md: '12px' }}
                            variant='p'
                            sx={{
                                width: '100%',
                                color: 'black',
                                fontWeight: '600',
                                display: 'flex',
                                justifyContent: 'end',
                                padding: '0.5rem 0 1rem 0',
                            }}
                            component='p'
                        >
                            Don&apos;t have an account?
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default UserLogin;
