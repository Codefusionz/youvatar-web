import cart from '@/redux/slice/cart'
import user from '@/redux/slice/user'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: { user, cart },
})

export default store
