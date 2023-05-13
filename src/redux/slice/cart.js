import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    courseData: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.courseData = action.payload
    },

    removeFromCart: (state, action) => {
      state.courseData = state.courseData.filter(
        (item) => item.id !== action.payload
      )
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer
