import Spinner from '@/components/Spinner'
import TextInput from '@/components/TextInput'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function ResetPassword() {
  const [form, setForm] = useState({
    password: '',
    password2: '',
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()
  const [errors, setErrors] = useState({
    password: '',
    password2: '',
  })

  const { source } = router.query

  useEffect(() => {
    if (status === 'loading') return
    if (session) router.push('/')
  }, [session, status])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (form.password.length < 6) {
        setErrors({
          ...errors,
          password: 'Password must be at least 6 characters',
        })
        return
      }
      if (form.password !== form.password2) {
        setErrors({
          ...errors,
          password2: 'Passwords do not match',
        })
        return
      }
      setLoading(true)
      await axios.post('/api/users/reset-password', {
        password: form.password,
        source: source,
        [source]: router.query[source],
      })
      router.push('/auth/login')
    } catch (error) {
      if (error.response?.data?.message) {
        setErrors({
          ...errors,
          password: error.response?.data?.message,
        })
      }
      console.log(error.response?.data?.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    setErrors({ password: '', password2: '' })
  }, [form])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 h-screen">
      <div className="col-span-2 hidden lg:block bg-primary"></div>
      <div className="col-span-1 w-full p-4 md:max-w-md md:mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center mt-24 "
        >
          <h1 className="text-primary font-extrabold text-3xl text-left w-full mb-6">
            Reset Password
          </h1>
          <TextInput
            label="Password"
            placeholder="*********"
            value={form.password}
            error={errors.password}
            type={showPassword ? 'text' : 'password'}
            label2={showPassword ? 'Hide' : 'Show'}
            label2Icon={showPassword ? <EyeIcon /> : <EyeSlashIcon />}
            onClickLabel2={() => setShowPassword(!showPassword)}
            onChange={(value) => setForm({ ...form, password: value })}
          />
          <TextInput
            label="Re-Enter Password"
            placeholder="*********"
            value={form.password2}
            error={errors.password2}
            type={showPassword ? 'text' : 'password'}
            label2={showPassword ? 'Hide' : 'Show'}
            label2Icon={showPassword ? <EyeIcon /> : <EyeSlashIcon />}
            onClickLabel2={() => setShowPassword(!showPassword)}
            onChange={(value) => setForm({ ...form, password2: value })}
          />
          <button
            disabled={loading}
            className="w-full bg-primary text-white rounded-md mt-6 p-2 font-semibold flex items-center justify-center"
          >
            {loading && <Spinner height={19} width={19} color="#fff" />}
            Reset Password
          </button>
        </form>
        <div className="text-center w-full mx-auto mt-6">
          Remember password?{' '}
          <Link href="/auth/login" className="text-primary">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword

ResetPassword.auth = false
