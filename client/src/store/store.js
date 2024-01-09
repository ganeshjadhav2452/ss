import { configureStore } from '@reduxjs/toolkit'
import slidebarReducer from './slices/slidebar'
import authSlice from './slices/authSlice';
import staffSlice from './slices/staffSlice';

const store = configureStore({
    reducer: {
        slidebar: slidebarReducer,
        auth: authSlice,
        staff: staffSlice
    }
})


export default store;