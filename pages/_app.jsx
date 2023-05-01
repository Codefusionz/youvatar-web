import { setUser } from '@/redux/slice/user'
import store from '@/redux/store'
import '@/styles/react-big-calendar.scss'
import axios from 'axios'
import Spinner from 'components/Spinner'
import { SessionProvider, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-image-crop/dist/ReactCrop.css'
import { Provider as ReduxProvider, useDispatch } from 'react-redux'
import 'styles/globals.css'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ReduxProvider store={store}>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </ReduxProvider>
    </SessionProvider>
  )
}

function Auth({ children }) {
  const { data: session, status } = useSession({ required: true })
  const dispatch = useDispatch()

  const fetchuser = async () => {
    const response = await axios.get(`/api/users/${session.sub}`)
    dispatch(setUser(response.data))
  }

  useEffect(() => {
    if (status === 'loading') return
    if (session) fetchuser()
  }, [session])

  if (status === 'loading')
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner height={50} width={50} color="#3949ab" />
      </div>
    )

  if (!session) return <span>Not auth</span>
  return children
}
