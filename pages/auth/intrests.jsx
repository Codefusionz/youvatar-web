import Spinner from '@/components/Spinner'
import { INTRESTS, SKILLS, SPORTS } from '@/utils/constants'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

function Intrests() {
  const [form, setForm] = useState({
    intrests: [],
    skills: [],
    sports: [],
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await axios.patch(`/api/users/${session.sub}`, {
        intrests: form,
      })
      router.push('/')
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 h-screen">
      <div className="col-span-2 hidden lg:block bg-primary"></div>
      <div className="col-span-1 w-full p-4 md:max-w-md md:mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center mt-24 "
        >
          <h1 className="text-primary font-bold text-3xl text-left w-full mb-6">
            What are you intrested in?
          </h1>
          <div className="flex flex-col w-full">
            <label className="text-primary font-semibold text-left mb-2">
              Intrests
            </label>
            <div className="flex flex-wrap gap-2">
              {INTRESTS.map((intrest) => (
                <span
                  key={intrest}
                  className={`text-primary ${
                    form.intrests.includes(intrest) && 'bg-primary text-white'
                  } text-sm p-2 border rounded-lg cursor-pointer hover:bg-primary hover:text-white`}
                  onClick={() => {
                    if (form.intrests.includes(intrest)) {
                      setForm({
                        ...form,
                        intrests: form.intrests.filter((i) => i !== intrest),
                      })
                    } else {
                      setForm({
                        ...form,
                        intrests: [...form.intrests, intrest],
                      })
                    }
                  }}
                >
                  {intrest}
                </span>
              ))}
            </div>
            <label className="text-primary font-semibold text-left mb-2 mt-6">
              Skills
            </label>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  className={`text-primary ${
                    form.skills.includes(skill) && 'bg-primary text-white'
                  } text-sm p-2 border rounded-lg cursor-pointer hover:bg-primary hover:text-white`}
                  onClick={() => {
                    if (form.skills.includes(skill)) {
                      setForm({
                        ...form,
                        skills: form.skills.filter((i) => i !== skill),
                      })
                    } else {
                      setForm({
                        ...form,
                        skills: [...form.skills, skill],
                      })
                    }
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
            <label className="text-primary font-semibold text-left mb-2 mt-6">
              Sports
            </label>
            <div className="flex flex-wrap gap-2">
              {SPORTS.map((sport) => (
                <span
                  key={sport}
                  className={`text-primary ${
                    form.sports.includes(sport) && 'bg-primary text-white'
                  } text-sm p-2 border rounded-lg cursor-pointer hover:bg-primary hover:text-white`}
                  onClick={() => {
                    if (form.sports.includes(sport)) {
                      setForm({
                        ...form,
                        sports: form.sports.filter((i) => i !== sport),
                      })
                    } else {
                      setForm({
                        ...form,
                        sports: [...form.sports, sport],
                      })
                    }
                  }}
                >
                  {sport}
                </span>
              ))}
            </div>
          </div>
          <button
            disabled={loading}
            className="w-full bg-primary text-white rounded-md mt-6 p-2 font-semibold flex items-center justify-center"
          >
            {loading && <Spinner height={19} width={19} color="#fff" />}
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Intrests

Intrests.auth = true
