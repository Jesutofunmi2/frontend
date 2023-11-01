import { InitialState, ISchool  } from '@/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: InitialState = {
  currentUser: null,
  currentSchool: null,
  currentTeacher: null,
}
const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload
    },
    logout: (state, action) => {
      state.currentUser = null
    },
    schoolData: (state, action) => {
      state.currentSchool = action.payload

    },
    schoolLogout: (state, action) => {
      state.currentTeacher = null
    },
    teacherData: (state, action) => {
      state.currentTeacher = action.payload
    },
    teacherLogout: (state, action) => {
      state.currentTeacher = null
    },
  },
})

export const { login, logout, schoolData, schoolLogout, teacherData, teacherLogout } =
  userSlice.actions
export const userData = (state: RootState) => state.user
export default userSlice.reducer
