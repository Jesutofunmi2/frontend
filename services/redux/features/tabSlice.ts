import {createSlice} from "@reduxjs/toolkit"

const tabSlice = createSlice({
    name:"currentTab",
    initialState: {
        status: "Students"
    },
    reducers: {
        currentTab: (state, action) => {
         state.status = action.payload
        }
    } 
});

export const {currentTab} = tabSlice.actions;
export default tabSlice.reducer;