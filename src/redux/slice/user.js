import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    mentor: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload
    },
    setMentor(state, action) {
      state.mentor = action.payload
    },
  },
})

export const { setUser, setMentor } = userSlice.actions
export default userSlice.reducer
