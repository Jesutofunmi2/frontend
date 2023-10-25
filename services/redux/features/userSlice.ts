import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState: {
        currentUser: null,
        currentSchool: null,
        currentTeacher: null
    },
    reducers: {
        login: (state, action) => {
         state.currentUser = action.payload

        },
        logout: (state, action) => {
            state.currentUser = null
        },
        schoolLogin: (state, action) => {
            state.currentSchool = action.payload
   
           },
        schoolLogout: (state, action) => {
               state.currentTeacher = null
           },       
        teacherLogin: (state, action) => {
            state.currentTeacher = action.payload
   
           },
        teacherLogout: (state, action) => {
               state.currentTeacher = null
           }
    } 
});

export const {login, logout, schoolLogin, schoolLogout, teacherLogin, teacherLogout} = userSlice.actions;
export default userSlice.reducer;