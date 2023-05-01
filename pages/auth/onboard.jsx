import Spinner from '@/components/Spinner'
import TextInput from '@/components/TextInput'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function Onboard() {
  const [form, setForm] = useState({
    displayName: '',
    username: '',
    password: '',
    password2: '',
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({
    displayName: '',
    username: '',
    password: '',
    password2: '',
  })
  const [usenameAvailable, setUsernameAvailable] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()

  const { source } = router.query

  useEffect(() => {
    if (status === 'loading') return
    if (session) router.push('/')
  }, [session, status])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (form.password !== form.password2) {
        setErrors({
          ...errors,
          password2: 'Passwords do not match',
        })
        return
      }

      if (errors.displayName || errors.username || errors.password) return

      setLoading(true)

      router.push({
        pathname: '/auth/dob',
        query: {
          username: form.username,
          password: form.password,
          displayName: form.displayName,
          source: source,
          [source]: router.query?.[source],
        },
      })
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    setErrors({
      displayName: '',
      username: '',
      password: '',
      password2: '',
    })
  }, [form])

  const handleCheckUsername = async () => {
    setUsernameAvailable(false)
    try {
      const response = await axios.get(
        `/api/auth/register?username=${form.username}`
      )
      setUsernameAvailable(true)
    } catch (error) {
      console.log(error)
      setErrors({
        ...errors,
        username: 'Username already taken',
      })
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (form.username.length > 0) handleCheckUsername()
    }, 500)
    return () => clearTimeout(timeout)
  }, [form.username])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 h-screen">
      <div className="col-span-2 hidden lg:block bg-primary"></div>
      <div className="col-span-1 w-full p-4 md:max-w-md md:mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center mt-24 "
        >
          <h1 className="text-primary font-bold text-3xl text-left w-full mb-6">
            Fill up your details
          </h1>
          <TextInput
            label="Display Name"
            placeholder="John"
            value={form.displayName}
            type="text"
            onChange={(value) => setForm({ ...form, displayName: value })}
          />
          <TextInput
            label="Username"
            placeholder="johndoe"
            value={form.username}
            type="text"
            error={errors.username}
            onChange={(value) => setForm({ ...form, username: value })}
          />
          {form.username.length > 0 && usenameAvailable && (
            <label className="text-green-500 text-sm mt-1 text-left w-full">
              Username Available
            </label>
          )}
          <TextInput
            label="Password"
            placeholder="*********"
            value={form.password}
            type={showPassword ? 'text' : 'password'}
            error={errors.password}
            label2={showPassword ? 'Hide' : 'Show'}
            onClickLabel2={() => setShowPassword(!showPassword)}
            onChange={(value) => setForm({ ...form, password: value })}
          />
          <TextInput
            label="Password repeat"
            placeholder="*********"
            value={form.password2}
            type={showPassword ? 'text' : 'password'}
            error={errors.password2}
            label2={showPassword ? 'Hide' : 'Show'}
            onClickLabel2={() => setShowPassword(!showPassword)}
            onChange={(value) => setForm({ ...form, password2: value })}
          />
          <button
            disabled={loading || !usenameAvailable}
            className="w-full bg-primary  disabled:bg-secondary text-white rounded-md mt-6 p-2 font-semibold flex items-center justify-center"
          >
            {loading && <Spinner height={19} width={19} color="#fff" />}
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Onboard

Onboard.auth = false
