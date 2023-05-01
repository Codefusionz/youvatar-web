import Spinner from '@/components/Spinner'
import TextInput from '@/components/TextInput'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function Login() {
  const [form, setForm] = useState({
    username: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { data: session, status } = useSession()
  const router = useRouter()
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  })

  useEffect(() => {
    if (status === 'loading') return
    if (session) router.push('/')
  }, [session, status])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const response = await signIn('credentials', {
        username: form.username,
        password: form.password,
        redirect: false,
      })

      if (!response.ok) {
        setErrors({ username: 'Username/Password mismatch' })
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    setErrors({ username: '', password: '' })
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
            Login
          </h1>
          <TextInput
            label="Username"
            placeholder="johndoe"
            value={form.username}
            type="text"
            error={errors.username}
            onChange={(value) => setForm({ ...form, username: value })}
          />
          <TextInput
            label="Password"
            placeholder="*********"
            value={form.password}
            type={showPassword ? 'text' : 'password'}
            label2={showPassword ? 'Hide' : 'Show'}
            label2Icon={showPassword ? <EyeIcon /> : <EyeSlashIcon />}
            onClickLabel2={() => setShowPassword(!showPassword)}
            onChange={(value) => setForm({ ...form, password: value })}
          />
          <Link
            href="/auth/forgot-password"
            className="w-full text-right mt-3 text-primary"
          >
            Forgot password?
          </Link>
          <button
            disabled={loading}
            className="w-full bg-primary text-white rounded-md mt-6 p-2 font-semibold flex items-center justify-center"
          >
            {loading && <Spinner height={19} width={19} color="#fff" />}
            Login
          </button>
        </form>
        <div className="my-8 flex items-center justify-center gap-4 text-gray-500">
          <hr className="w-32 h-px bg-gray-200 border-0" />
          OR
          <hr className="w-32 h-px bg-gray-200 border-0" />
        </div>
        <button
          disabled={loading}
          onClick={() => {}}
          className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center mr-2 mb-2"
        >
          <Image
            src="/svg/logo/google.svg"
            width={24}
            height={24}
            className="mr-2"
            alt="Google"
          />
          Sign in with Google
        </button>
        <button
          disabled={loading}
          onClick={() => {}}
          className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center mr-2 mb-2"
        >
          <Image
            src="/svg/logo/github.svg"
            width={24}
            height={24}
            className="mr-2"
            alt="Github"
          />
          Sign in with Github
        </button>
        <div className="text-center w-full mx-auto mt-6">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-primary">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login

Login.auth = false
