import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axiosInstance from '../../config/axiosInstance';

// const axiosInstance = await initializeAxiosInstance();

const initialState = {
    client_id: sessionStorage.getItem('client_id') || '',
    AUTH_KEY: 'TXlDb206TG95QVBJMTIz',
    imageURL: sessionStorage.getItem('FileURL') || '',
    user_name: '',
    password: '',
    loadingLogin: false,
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    login_status: '',
    triggered: false,
    errorLogin: '',
    STATUS: false,
    MESSAGE: '',
    CLIENT_ID: '',
    NAME: '',
    USER_TYPE: '',
    PROFILE_IMAGE: '',
};

export const fetchLogin = createAsyncThunk(
    'auth/fetchLogin',
    async (formDetails) => {
        try {
            const response = await axiosInstance.post(`Loy_CRM_Login`, {
                DATA: formDetails,
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false;
            localStorage.setItem('isLoggedIn', 'false');
            state.permissions = [];
            localStorage.removeItem('permissions');
            localStorage.removeItem('user_type');
            state.login_status = '';
            localStorage.clear();
            sessionStorage.clear();
        },
        setClientId: (state, action) => {
            state.client_id = action.payload;
        },
        setClientName: (state, action) => {
            state.NAME = action.payload;
        },
        setUserType: (state, action) => {
            state.USER_TYPE = action.payload;
        },
        setImageFileUrl: (state, action) => {
            state.imageURL = action.payload;
        },
        setProfileImgUrl: (state, action) => {
            state.PROFILE_IMAGE = action.payload;
        },
        setLoginMsg: (state, action) => {
            state.MESSAGE = action.payload;
        },
        setLoginStatus: (state, action) => {
            state.STATUS = action.payload;
        },
        resetAuthState: (state, action) => {
            state = {
                client_id: '',
                AUTH_KEY: 'TXlDb206TG95QVBJMTIz',
                imageURL: '',
                user_name: '',
                password: '',
                loadingLogin: false,
                isLoggedIn: false,
                login_status: '',
                triggered: false,
                errorLogin: '',
                STATUS: false,
                MESSAGE: '',
                CLIENT_ID: '',
                NAME: '',
                USER_TYPE: '',
                PROFILE_IMAGE: '',
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.loadingLogin = true;
                state.errorLogin = null;
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                const loginResult = action.payload[0];
                if (loginResult.STATUS) {
                    state.STATUS = loginResult.STATUS;
                    state.MESSAGE = loginResult.MESSAGE;
                    state.client_id = loginResult.CLIENT_ID;
                    state.NAME = loginResult.NAME;
                    state.USER_TYPE = loginResult.USER_TYPE;
                    state.PROFILE_IMAGE = loginResult.PROFILE_IMAGE;
                    state.isLoggedIn = true;
                    state.login_status = 'Login successful';
                    sessionStorage.setItem('CLIENT_ID', loginResult.CLIENT_ID);
                    sessionStorage.setItem('MESSAGE', loginResult.MESSAGE);
                    sessionStorage.setItem('NAME', loginResult.NAME);
                    sessionStorage.setItem(
                        'PROFILE_IMAGE',
                        loginResult.PROFILE_IMAGE
                    );
                    sessionStorage.setItem('STATUS', loginResult.STATUS);
                    sessionStorage.setItem('USER_TYPE', loginResult.USER_TYPE);
                    localStorage.setItem('isLoggedIn', 'true');
                } else {
                    state.login_status =
                        'Login failed. Please check your credentials.';
                    state.isLoggedIn = false;
                    localStorage.setItem('isLoggedIn', 'false');
                }
                state.loadingLogin = false;
                state.triggered = !state.triggered;
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.loadingLogin = false;
                state.errorLogin = action.error.message;
            });
    },
});

export const selectAuthClientId = (state) => state.auth.client_id;

export const {
    setLoginMsg,
    setProfileImgUrl,
    logout,
    setClientId,
    setClientName,
    setUserType,
    setImageFileUrl,
    resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;
