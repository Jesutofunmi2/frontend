import {createSlice} from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const selectedLanguageSlice = createSlice({
    name:"language",
    initialState: {
        currentLanguage:null
    },
    reducers: {
        selectedLanguage: (state, action) => {
            // state.selectedLanguage = action.payload
   
           },
    } 
});

export const {selectedLanguage } = selectedLanguageSlice.actions;
export default selectedLanguageSlice.reducer;