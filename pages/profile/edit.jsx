import DatePicker from '@/components/DatePicker'
import HomeNavigation from '@/components/HomeNavigation'
import ProfileBackgroundCropper from '@/components/ProfileBackgroundCropper.tsx'
import ProfileImageCropper from '@/components/ProfileImageCropper.tsx'
import Spinner from '@/components/Spinner'
import TextInput from '@/components/TextInput'
import { updateProfileSchema } from '@/schema/user'
import { INTRESTS, SKILLS, SPORTS } from '@/utils/constants'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function EditProfile() {
  const user = useSelector((state) => state.user.data)
  const { courseData } = useSelector((state) => state.cart)
  const [submitState, setSubmitState] = useState({ loading: false, error: '' })

  const [form, setForm] = useState({
    displayName: '',
    username: '',
    bio: '',
    intrests: [],
    skills: [],
    sports: [],
    email: '',
    dateOfBirth: null,
  })
  const [loading, setLoading] = useState(false)
  const [crop, setCrop] = useState({
    unit: '%',
    width: 40,
    height: 70,
  })
  const [errors, setErrors] = useState({
    displayName: '',
    username: '',
    bio: '',
    intrests: '',
    skills: '',
    sports: '',
  })
  const { data: session } = useSession()
  const [usenameAvailable, setUsernameAvailable] = useState(false)
  const [imgSrc, setImgSrc] = useState(undefined)
  const [croppedImage, setCroppedImageUrl] = useState(undefined)

  const handleSubmit = async (e) => {
    e?.preventDefault()
    try {
      const clone = { ...form }
      clone.intrests = {
        intrests: clone.intrests,
        skills: clone.skills,
        sports: clone.sports,
      }
      delete clone.skills
      delete clone.sports

      setSubmitState({ loading: true, error: '' })

      const values = await updateProfileSchema.validateAsync(clone)
      await axios.patch(`/api/users/${session.sub}`, values)

      setLoading(true)
    } catch (error) {
      console.log(error)
    }
    setSubmitState({ loading: false, error: '' })
  }

  useEffect(() => {
    setErrors({ displayName: '', username: '' })
  }, [form])

  useEffect(() => {
    if (form?.username === user?.username) {
      setUsernameAvailable(false)
      return
    }
    const timeout = setTimeout(() => {
      if (form.username.length > 0) handleCheckUsername()
    }, 500)
    return () => clearTimeout(timeout)
  }, [form.username])

  const handleCheckUsername = async () => {
    if (form.username === user.username) return
    setUsernameAvailable(false)
    try {
      await axios.get(`/api/auth/register?username=${form.username}`)
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
    if (!user) return
    setForm({
      displayName: user.displayName,
      username: user.username,
      email: user.email,
      intrests: user.intrests.intrests,
      skills: user.intrests.skills,
      sports: user.intrests.sports,
      dateOfBirth: new Date(user.dateOfBirth),
      bio: user.bio,
    })
  }, [user])

  if (!user)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner height={50} width={50} color="#3949ab" />
      </div>
    )

  return (
    <div className="flex">
      <HomeNavigation courseData={courseData.length} />
      <div className="flex flex-col w-full h-screen overflow-y-scroll">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-xl mx-auto items-center justify-center my-24 px-6"
        >
          <h1 className="text-primary font-bold text-3xl text-left w-full mb-6">
            Update your profile
          </h1>
          <ProfileImageCropper userId={user.id} />
          <ProfileBackgroundCropper userId={user.id} />
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
          <TextInput
            label="Bio"
            placeholder="I am a student at the University of Waterloo"
            value={form.bio}
            type="text"
            error={errors.bio}
            onChange={(value) => setForm({ ...form, bio: value })}
          />
          {form.username.length > 0 && usenameAvailable && (
            <label className="text-green-500 text-sm mt-1 text-left w-full">
              Username Available
            </label>
          )}
          <TextInput
            label="Email"
            placeholder="johndoe"
            value={form.email}
            type="email"
            error={errors.email}
            onChange={(value) => setForm({ ...form, email: value })}
          />
          <DatePicker
            disabled={true}
            label={'Date of Birth'}
            value={form.dateOfBirth}
            onChange={(value) => setForm({ ...form, dateOfBirth: value })}
          />
          <div className="flex flex-col w-full mt-6">
            <label className="text-primary font-semibold text-left mb-2">
              Intrests
            </label>
            <div className="flex flex-wrap gap-2">
              {INTRESTS.map((intrest) => (
                <span
                  key={intrest}
                  className={`text-primary ${
                    form.intrests.includes(intrest) && 'bg-primary text-white'
                  } text-sm p-2 border rounded-lg cursor-pointer hover:bg-secondary hover:text-white`}
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
                  } text-sm p-2 border rounded-lg cursor-pointer hover:bg-secondary hover:text-white`}
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
                  } text-sm p-2 border rounded-lg cursor-pointer hover:bg-secondary hover:text-white`}
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
            disabled={submitState.loading}
            className="w-full bg-primary  disabled:bg-secondary text-white rounded-md mt-6 p-2 font-semibold flex items-center justify-center"
          >
            {submitState.loading && (
              <Spinner height={19} width={19} color="#fff" />
            )}
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

EditProfile.auth = true
