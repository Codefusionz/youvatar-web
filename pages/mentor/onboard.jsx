import MentorAddress from '@/components/MentorAddress'
import MentorDetails from '@/components/MentorDetails'
import MentorDocuments from '@/components/MentorDocuments'
import MentorOnboard from '@/components/MentorOnboard'
import MentorSidebar from '@/components/MentorSidebar'
import Progressbar from '@/components/Progressbar'
import Spinner from '@/components/Spinner'
import { getSingedUrl } from '@/utils/helpers'
import axios from 'axios'
import crypto from 'crypto'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Mentor() {
  const [form, setForm] = useState({
    schoolName: '',
    schoolMotive: '',
    schoolNiche: '',
    schoolDescription: '',
    mentorLanguage: '',
    mentorIdentity: '',
    mentorIsTeacher: '',
    mentorExperience: '',
    mentorHaveDocuments: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    mentorPanCard: '',
    mentorVideo: '',
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [step, setStep] = useState(1)
  const totalSteps = 4
  const user = useSelector((state) => state.user.data)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (step < totalSteps) {
      setStep(step + 1)
      return
    }

    if (!form.mentorPanCard || !form.mentorVideo) {
      alert('Please upload all the documents')
      return
    }

    try {
      setLoading(true)
      const pancardUrlKey = crypto.randomBytes(16).toString('hex')
      const videoUrlKey = crypto.randomBytes(16).toString('hex')

      const panCardUploadUrl = await getSingedUrl(pancardUrlKey)
      const videoUploadUrl = await getSingedUrl(videoUrlKey)

      await axios.put(panCardUploadUrl, form.mentorPanCard, {
        headers: {
          'Content-Type': 'image/jpg',
        },
      })

      await axios.put(videoUploadUrl, form.mentorVideo, {
        headers: {
          'Content-Type': 'image/jpg',
        },
      })

      await axios.post('/api/mentor', {
        ...form,
        schoolNiche: form.schoolNiche.value,
        mentorLanguage: form.mentorLanguage.value,
        mentorIdentity: form.mentorIdentity.value,
        mentorIsTeacher: form.mentorIsTeacher.value,
        mentorExperience: form.mentorExperience.value,
        mentorHaveDocuments: form.mentorHaveDocuments.value,
        mentorPanCard: pancardUrlKey,
        mentorVideo: videoUrlKey,
      })
      router.push('/mentor/slots')
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const checkPreviousSubmission = async () => {
    try {
      await axios.get('/api/mentor')
      router.push('/mentor/slots')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user?.isMentor) router.push('/mentor/slots')
    checkPreviousSubmission()
  }, [user])

  if (!user) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner height={50} width={50} color="#3949ab" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <MentorSidebar />
      <div className="col-span-1 w-full p-4 md:max-w-lg md:mx-auto">
        <form onSubmit={handleSubmit} className="pt-24 h-full">
          {step === 1 && <MentorOnboard form={form} setForm={setForm} />}
          {step === 2 && <MentorDetails form={form} setForm={setForm} />}
          {step === 3 && <MentorAddress form={form} setForm={setForm} />}
          {step === 4 && <MentorDocuments form={form} setForm={setForm} />}
          <div className="flex flex-grow"></div>
          <div className="w-full mt-4 flex flex-col gap-2">
            <span className="text-lg font-bold">
              Step {step} of {totalSteps}
            </span>
            <Progressbar progress={(step / totalSteps) * 100} color="#3949ab" />
            <div className="flex flex-row">
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className={`w-full ${
                  step === 1 && 'invisible'
                } text-gray-900 rounded-md mt-6 p-2 font-normal flex items-center justify-center`}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white rounded-md mt-6 p-2 font-normal flex items-center justify-center"
              >
                {loading && <Spinner height={19} width={19} color="#fff" />}
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Mentor

Mentor.auth = true
