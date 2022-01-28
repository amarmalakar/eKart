import { createSlice } from '@reduxjs/toolkit';

let isLoggedIn = false;
const authToken = sessionStorage.getItem('Auth Token');
const userId = sessionStorage.getItem('user');
isLoggedIn = !authToken || !userId ? false : true;

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn,
        authToken,
        userId,
        userData: undefined
    },
    reducers: {
        authActiveHandler: (state, action) => {
            const refreshToken = action.payload.refreshToken;
            const userId = action.payload.userId;
            sessionStorage.setItem('Auth Token', refreshToken)
            sessionStorage.setItem('user', userId)
            state.isLoggedIn = true;
            state.authToken = refreshToken;
            state.userId = userId;
        },
        logoutHandler: (state) => {
            state.isLoggedIn = false;
            state.authToken = null;
            state.userId = null;
            state.userId = undefined;
            sessionStorage.removeItem('Auth Token');
            sessionStorage.removeItem('user');
        },
        userDataHandler: (state, action) => {
            state.userData = action.payload;
        }
    }
})

export const AuthActions = authSlice.actions

export default authSlice