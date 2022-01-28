import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice'
import { userDataApi } from './userDataApi'

const store =  configureStore({
    reducer: {
        auth: authSlice.reducer,
        // [userDataApi.reducerPath]: userDataApi.reducer,
    },
})

export default store;