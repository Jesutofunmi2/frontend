import { InitialState} from '@/types'
import { createSlice } from '@reduxjs/toolkit'
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
    },
  },
})

export const { login, logout, schoolLogin, schoolLogout, teacherLogin, teacherLogout } =
  userSlice.actions
export const userData = (state: RootState) => state.user
export default userSlice.reducer
