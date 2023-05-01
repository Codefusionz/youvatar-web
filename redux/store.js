import user from '@/redux/slice/user'
import cart from '@/redux/slice/cart'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: { user, cart },
})

export default store
