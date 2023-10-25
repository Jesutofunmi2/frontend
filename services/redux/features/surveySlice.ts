import {createSlice} from "@reduxjs/toolkit"

const surveySlice = createSlice({
    name:"surveyStatus",
    initialState: {
        status: false
    },
    reducers: {
        surveyStatus: (state, action) => {
         state.status = action.payload
        }
    } 
});

export const {surveyStatus} = surveySlice.actions;
export default surveySlice.reducer;