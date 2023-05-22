'use client'

import { useSupabase } from '@/app/providers/supabase-provider'
import PrimaryButton from '@/components/Button/Primary'
import SocialButton from '@/components/Button/Social'
import TextInput from '@/components/TextInput'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast, { CheckmarkIcon, ErrorIcon } from 'react-hot-toast'

type Inputs = {
  email: string
}

export default function Page() {
  const [loading, setLoading] = useState(false)
  const { supabase } = useSupabase()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (event) => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email: event.email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: window.location.origin + '/dashboard',
      },
    })
    if (error) {
      toast('Unable to sign in at the moment', {
        icon: <ErrorIcon />,
      })
    } else {
      toast('Please check your email', {
        icon: <CheckmarkIcon />,
      })
    }

    setLoading(false)
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center mt-24 "
      >
        <h1 className="text-primary font-extrabold text-3xl text-left w-full mb-6">
          Login
        </h1>
        <TextInput
          label="Email"
          placeholder="user@email.com"
          type="text"
          error={errors.email?.message?.toString()}
          rest={{
            ...register('email', {
              required: { value: true, message: 'Email is required' },
            }),
          }}
        />
        <PrimaryButton title="Login" loading={loading} />
      </form>
      <div className="my-8 flex items-center justify-center gap-4 text-gray-500">
        <hr className="w-32 h-px bg-gray-200 border-0" />
        OR
        <hr className="w-32 h-px bg-gray-200 border-0" />
      </div>
      <SocialButton onClick={() => {}} src="/svg/logo/google.svg" alt="Google">
        Sign in with Google
      </SocialButton>
      <SocialButton onClick={() => {}} src="/svg/logo/github.svg" alt="Github">
        Sign in with Github
      </SocialButton>
    </div>
  )
}
