import { createSlice } from '@reduxjs/toolkit'

const slidebar = createSlice({
    name: 'slidebar',
    initialState: {
        toggle: true
    },
    reducers: {
        toggleSlidebarReducer(state, action) {
            state.toggle = !state.toggle;
        }
    }
})

export default slidebar.reducer;
export const { toggleSlidebarReducer } = slidebar.actions;