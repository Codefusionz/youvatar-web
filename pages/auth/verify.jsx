import Spinner from '@/components/Spinner'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Verify() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { data: session, status } = useSelector((state) => state.user)
  const [resend, setResend] = useState(false)

  const { source } = router.query

  useEffect(() => {
    if (status === 'loading') return
    if (session) router.push('/')
  }, [session, status])

  const handleResend = async () => {
    try {
      const response = await axios.get(
        `/api/auth/otp?${source}=${router.query[source]}&reason=register`
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const inputs = document.querySelectorAll('#otp > *[id]')
    const otp = []
    for (let i = 0; i < inputs.length; i++) {
      otp.push(inputs[i].value)
    }

    try {
      setLoading(true)

      const response = await axios.post(
        `/api/auth/otp?${source}=${router.query[source]}&otp=${otp.join(
          ''
        )}&reason=register`
      )

      router.push({
        pathname: '/auth/onboard',
        query: { [source]: router.query[source], source: source },
      })
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    function OTPInput() {
      const inputs = document.querySelectorAll('#otp > *[id]')
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('keydown', function (event) {
          if (event.key === 'Backspace') {
            inputs[i].value = ''
            if (i !== 0) inputs[i - 1].focus()
          } else {
            if (i === inputs.length - 1 && inputs[i].value !== '') {
              return true
            } else if (event.keyCode > 47 && event.keyCode < 58) {
              inputs[i].value = event.key
              if (i !== inputs.length - 1) inputs[i + 1].focus()
              event.preventDefault()
            } else if (event.keyCode > 64 && event.keyCode < 91) {
              inputs[i].value = String.fromCharCode(event.keyCode)
              if (i !== inputs.length - 1) inputs[i + 1].focus()
              event.preventDefault()
            }
          }
        })
      }
    }
    OTPInput()

    return () => {
      document.removeEventListener('keydown', OTPInput)
    }
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 h-screen">
      <div className="col-span-2 hidden lg:block bg-primary"></div>
      <div className="col-span-1 w-full p-4 md:max-w-md md:mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center mt-24 "
        >
          <h1 className="text-primary font-bold text-3xl text-left w-full mb-6">
            Verify your Email
          </h1>
          <div className="w-full text-left">
            <span>
              We've sent an activation code to{' '}
              <span className="text-primary">{router.query?.email}</span>
            </span>
          </div>
          <div
            id="otp"
            className="flex flex-row justify-center text-center px-2 mt-5"
          >
            <input
              className="m-2 border h-10 w-10 text-center form-control rounded-lg"
              type="text"
              id="first"
              maxLength="1"
              required
            />
            <input
              className="m-2 border h-10 w-10 text-center form-control rounded-lg"
              type="text"
              id="second"
              maxLength="1"
              required
            />
            <input
              className="m-2 border h-10 w-10 text-center form-control rounded-lg"
              type="text"
              id="third"
              maxLength="1"
              required
            />
            <input
              className="m-2 border h-10 w-10 text-center form-control rounded-lg"
              type="text"
              id="fourth"
              maxLength="1"
              required
            />
            <input
              className="m-2 border h-10 w-10 text-center form-control rounded-lg"
              type="text"
              id="fifth"
              maxLength="1"
              required
            />
            <input
              className="m-2 border h-10 w-10 text-center form-control rounded-lg"
              type="text"
              id="sixth"
              maxLength="1"
              required
            />
          </div>
          {error && (
            <span className="text-red-500 text-sm text-center w-full mt-2">
              {error}
            </span>
          )}
          <button
            disabled={loading}
            className="w-full bg-primary text-white rounded-md mt-6 p-2 font-semibold flex items-center justify-center disabled:bg-gray-300 disabled:text-slate-600"
          >
            {loading && <Spinner height={19} width={19} color="#fff" />}
            Submit
          </button>
        </form>
        <div className="text-center w-full mx-auto mt-6">
          Didn't receive a code?{' '}
          <button onClick={handleResend} className="text-primary">
            Resend
          </button>
        </div>
        {resend && (
          <div className="text-center w-full mx-auto mt-2">
            <span className="text-green-500">
              Code has been sent successfully!
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Verify

Verify.auth = false
