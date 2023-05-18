'use client'

import store from '@/redux/store'
import { Provider as ReduxProvider } from 'react-redux'

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReduxProvider store={store}>
      <>{children}</>
    </ReduxProvider>
  )
}
