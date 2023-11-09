import { createSlice } from '@reduxjs/toolkit'

const lessonsSlice = createSlice({
  name: 'lessons',
  initialState: {
    data: null,
    isLoading: false,
  },
  reducers: {
    lessonsData: (state, action) => {
      state.data = action.payload
    },
    lessonLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const { lessonsData, lessonLoading } = lessonsSlice.actions
export default lessonsSlice.reducer
