'use client'

import { useSupabase } from '@/app/providers/supabase-provider'
import PrimaryButton from '@/components/Button/Primary'
import Dropzone from '@/components/Dropzone'
import Progressbar from '@/components/Progressbar'
import Select from '@/components/Select'
import TextInput from '@/components/TextInput'
import {
  HAVE_MATERIAL_TO_TEACH_OPTIONS,
  IDENTIFY_YOURSELF_OPTIONS,
  LANGUAGE_OPTIONS,
  NICHE_OPTIONS,
  ONLINE_TEACHER_OPTIONS,
  YEARS_OF_EXPERIENCE_OPTIONS,
} from '@/utils/constants'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

type SelectType = {
  label: string
  value: string
}

type Inputs = {
  name: string
  motive: string
  niche: SelectType
  description: string
  language: SelectType
  identity: SelectType
  teaching: SelectType
  experience: SelectType
  documents: SelectType
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  postal: number
  pancard: File
  video: File
}

function Mentor() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [step, setStep] = useState(1)
  const totalSteps = 4
  const user = useSelector((state: any) => state?.user?.data)
  const { supabase } = useSupabase()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (event) => {
    if (step < totalSteps) {
      setStep(step + 1)
      return
    }

    try {
      setLoading(true)

      const panCardUrl = await supabase.storage
        .from('youvatar')
        .upload(`mentor/pancard-${user.id}.jpg`, event.pancard, {
          upsert: true,
        })

      const videoUrl = await supabase.storage
        .from('youvatar')
        .upload(`mentor/video-${user.id}.mp4`, event.video, { upsert: true })

      const { error } = await supabase.from('mentor').insert({
        ...event,
        niche: event.niche?.value,
        language: event.language?.value,
        identity: event.identity?.value,
        teaching: event.teaching?.value,
        experience: event.experience?.value,
        documents: event.documents?.value,
        pancard: panCardUrl.data?.path,
        video: videoUrl.data?.path,
      })

      if (!error) router.push('/mentor/slots')
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const checkSubmittions = async () => {
    const { data: mentor } = await supabase
      .from('mentor')
      .select()
      .eq('id', user?.id)
      .single()

    if (mentor) {
      if (mentor?.isVerified) router.push('/mentor/dashboard')
      else router.push('/mentor/slots')
    }
  }

  useEffect(() => {
    checkSubmittions()
  }, [])

  useEffect(() => {
    if (!user) router.replace('/dashboard')
  }, [user])

  return (
    <div className="col-span-1 w-full p-4 md:max-w-lg md:mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="pt-24 h-full">
        {step === 1 && (
          <div>
            <h1 className="text-primary font-extrabold text-3xl text-left w-full">
              Lets get you setup
            </h1>
            <TextInput
              label="School Name"
              placeholder="Your School Name"
              type="text"
              error={errors.name?.message?.toString()}
              rest={{
                ...register('name', {
                  required: {
                    value: true,
                    message: 'School Name is required',
                  },
                }),
              }}
            />
            <TextInput
              label="School's Motive"
              placeholder="Enter School's Motive"
              type="text"
              error={errors.motive?.message?.toString()}
              rest={{
                ...register('motive', {
                  required: {
                    value: true,
                    message: 'Motive is required',
                  },
                }),
              }}
            />
            <Select
              label="School Niche"
              error={errors.niche?.message?.toString()}
              options={NICHE_OPTIONS}
              placeholder="Choose your niche"
              name="niche"
              control={control}
            />
            <TextInput
              label="School Description"
              placeholder="Describe about yourself and mention your education/qualifications"
              type="text"
              error={errors.description?.message?.toString()}
              rest={{
                ...register('description', {
                  required: {
                    value: true,
                    message: 'School Description is required',
                  },
                }),
              }}
            />
          </div>
        )}
        {step === 2 && (
          <div>
            <h1 className="text-primary font-extrabold text-3xl text-left w-full">
              Fill up your details
            </h1>
            <Select
              label="In what language do you teach?"
              error={errors.language?.message?.toString()}
              options={LANGUAGE_OPTIONS}
              placeholder="Choose your language"
              control={control}
              name="language"
            />
            <Select
              label="How do you identify yourself?"
              error={errors.identity?.message?.toString()}
              options={IDENTIFY_YOURSELF_OPTIONS}
              control={control}
              name="identity"
              placeholder="Choose your identity"
            />
            <Select
              label="Are you already teaching online?"
              error={errors.teaching?.message?.toString()}
              options={ONLINE_TEACHER_OPTIONS}
              control={control}
              name="teaching"
              placeholder="Choose your option"
            />
            <Select
              label="How many years of experience do you have in teaching?"
              error={errors.experience?.message?.toString()}
              options={YEARS_OF_EXPERIENCE_OPTIONS}
              control={control}
              name="experience"
              placeholder="Choose your option"
            />
            <Select
              label="Do you have material or document to teach?"
              error={errors.documents?.message?.toString()}
              options={HAVE_MATERIAL_TO_TEACH_OPTIONS}
              control={control}
              name="documents"
              placeholder="Choose your option"
            />
          </div>
        )}
        {step === 3 && (
          <div>
            <h1 className="text-primary font-extrabold text-3xl text-left w-full">
              Fill Your Address
            </h1>
            <TextInput
              label="Address Line 1"
              placeholder="Enter Address Line"
              type="text"
              error={errors.addressLine1?.message?.toString()}
              rest={{
                ...register('addressLine1', {
                  required: {
                    value: true,
                    message: 'Address is required',
                  },
                }),
              }}
            />
            <TextInput
              label="Address Line 2"
              placeholder="Enter Address Line 2"
              type="text"
              error={errors.addressLine2?.message?.toString()}
              rest={{
                ...register('addressLine2', {
                  required: {
                    value: true,
                    message: 'Address 2 is required',
                  },
                }),
              }}
            />
            <TextInput
              label="City"
              placeholder="Enter your city"
              type="text"
              error={errors.city?.message?.toString()}
              rest={{
                ...register('city', {
                  required: {
                    value: true,
                    message: 'City is required',
                  },
                }),
              }}
            />
            <TextInput
              label="State"
              placeholder="Enter your state"
              type="text"
              error={errors.state?.message?.toString()}
              rest={{
                ...register('state', {
                  required: {
                    value: true,
                    message: 'State is required',
                  },
                }),
              }}
            />
            <TextInput
              label="Pincode"
              placeholder="Enter your pincode"
              type="number"
              error={errors.postal?.message?.toString()}
              rest={{
                ...register('postal', {
                  minLength: {
                    value: 6,
                    message: 'Postal Code is required',
                  },
                }),
              }}
            />
          </div>
        )}
        {step === 4 && (
          <div>
            <h1 className="text-primary font-extrabold text-3xl text-left w-full">
              You are almost there <br />
              Upload your documents
            </h1>
            <Dropzone
              label="Upload PAN Card"
              accept="image/png, image/jpeg"
              control={control}
              name="pancard"
              error={errors.pancard?.message?.toString()}
            />
            <Dropzone
              label="Upload Your Video"
              accept="video/mp4, video/nkv"
              control={control}
              name="video"
              error={errors.video?.message?.toString()}
            />
          </div>
        )}
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
            <PrimaryButton
              title="Next"
              type="submit"
              loading={loading}
              className="w-full bg-primary text-white rounded-md mt-6 p-2 font-normal flex items-center justify-center"
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default Mentor

Mentor.auth = true
