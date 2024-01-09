import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {}
    },
    reducers: {
        updateUser(state, action) {
            state.user = action.payload;

            axios.defaults.headers['authorization'] = action.payload.token
            console.log('this is token in axios defaults', axios.defaults.headers['authorization'])
        }
    }
})


export const { updateUser } = authSlice.actions;
export default authSlice.reducer;