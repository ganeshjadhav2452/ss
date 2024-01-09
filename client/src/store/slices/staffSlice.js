import { createSlice } from "@reduxjs/toolkit";


const staffSlice = createSlice({
    name: 'staff',
    initialState: {
        currentStaff: {}
    },
    reducers: {
        updateCurrentStaff(state, action) {
            state.currentStaff = action.payload
        }
    }
})


export const { updateCurrentStaff } = staffSlice.actions;
export default staffSlice.reducer;


