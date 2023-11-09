import {createSlice} from "@reduxjs/toolkit"
import { RootState } from "../store";

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
export const userSurvey = (state: RootState) => state.survey.status
export default surveySlice.reducer;