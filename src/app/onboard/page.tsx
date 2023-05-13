'use client'

import { useSupabase } from '@/app/supabase-provider'
import PrimaryButton from '@/components/Button/Primary'
import SecondaryButton from '@/components/Button/Secondary'
import Spinner from '@/components/Spinner'
import TextInput from '@/components/TextInput'
import { INTRESTS, SKILLS, SPORTS } from '@/utils/constants'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast, { ErrorIcon } from 'react-hot-toast'
import Select from 'react-select'

type Inputs = {
  username: string
  displayName: string
}

interface OptionType {
  value: number
  label: string
}

export default function Page() {
  const [loading, setLoading] = useState(false)
  const [steps, setSteps] = useState(0)
  const [dateOfBirth, setDateOfBirth] = useState<string | null>(null)
  const [intrests, setIntrests] = useState<string[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [sports, setSports] = useState<string[]>([])
  const { supabase } = useSupabase()
  const [selectedDay, setSelectedDay] = useState<OptionType | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<OptionType | null>(null)
  const [selectedYear, setSelectedYear] = useState<OptionType | null>(null)
  const router = useRouter()
  const totalSteps = 3

  const handleDayChange = (selectedOption: any) => {
    setSelectedDay(selectedOption as OptionType)
  }

  const handleMonthChange = (selectedOption: any) => {
    setSelectedMonth(selectedOption as OptionType)
  }

  const handleYearChange = (selectedOption: any) => {
    setSelectedYear(selectedOption as OptionType)
  }

  const days: OptionType[] = Array.from({ length: 31 }, (_, index) => ({
    value: index + 1,
    label: (index + 1).toString(),
  }))

  const months: OptionType[] = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ]

  const currentYear = new Date().getFullYear()
  const years: OptionType[] = Array.from({ length: 100 }, (_, index) => ({
    value: currentYear - index,
    label: (currentYear - index).toString(),
  }))

  useEffect(() => {
    if (selectedDay && selectedMonth && selectedYear) {
      const date = new Date(
        selectedYear.value,
        selectedMonth.value - 1,
        selectedDay.value
      )
      const timestamp = date.toISOString()

      setDateOfBirth(timestamp)
    }
  }, [selectedDay, selectedMonth, selectedYear])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (event) => {
    if (steps === 0) {
      setLoading(true)
      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', event.username)
        .single()

      if (data) {
        toast('Username already taken', { icon: <ErrorIcon /> })
        setLoading(false)
        return
      }
      setLoading(false)
    }

    if (totalSteps - 1 > steps) {
      setSteps(steps + 1)
      return
    }

    setLoading(true)

    const { data: user } = await supabase.auth.getSession()

    const { error } = await supabase.from('profiles').insert({
      id: user.session?.user?.id,
      username: event.username,
      displayName: event.displayName,
      dateOfBirth,
      intrests: {
        intrests: intrests,
        skills: skills,
        sports: sports,
      },
    })

    if (error) {
      toast('Unable to register at the moment', {
        icon: <ErrorIcon />,
      })
    } else router.push('/dashboard/feed')

    setLoading(false)
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center mt-24 "
      >
        {steps === 0 && (
          <div className="w-full">
            <h1 className="text-primary font-extrabold text-3xl text-left w-full mb-6">
              Fill up your details
            </h1>
            <TextInput
              label="Display Name"
              placeholder="John Dow"
              type="text"
              error={errors.displayName?.message?.toString()}
              rest={{
                ...register('displayName', {
                  required: {
                    value: true,
                    message: 'Display Name is required',
                  },
                }),
              }}
            />
            <TextInput
              label="Username"
              placeholder="johndoe"
              type="text"
              error={errors.username?.message?.toString()}
              rest={{
                ...register('username', {
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters',
                  },
                }),
              }}
            />
          </div>
        )}
        {steps === 1 && (
          <div className="w-full">
            <h1 className="text-primary font-extrabold text-3xl text-left w-full mb-6">
              Add Your Birthday
            </h1>
            <div className="flex flex-row gap-4 w-full">
              <Select
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    border: state.isFocused
                      ? '1px solid #3949AB'
                      : '1px solid #D2D6DC',
                    color: state.isFocused ? '#3949AB' : '#D2D6DC',
                    boxShadow: state.isFocused ? '0 0 0 1px #3949AB' : 'none',
                    '&:hover': {
                      border: state.isFocused
                        ? '1px solid #3949AB'
                        : '1px solid #D2D6DC',
                    },
                  }),
                }}
                required
                className="w-full"
                placeholder="Day"
                value={selectedDay}
                options={days}
                onChange={handleDayChange}
              />
              <Select
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    border: state.isFocused
                      ? '1px solid #3949AB'
                      : '1px solid #D2D6DC',
                    color: state.isFocused ? '#3949AB' : '#D2D6DC',
                    boxShadow: state.isFocused ? '0 0 0 1px #3949AB' : 'none',
                    '&:hover': {
                      border: state.isFocused
                        ? '1px solid #3949AB'
                        : '1px solid #D2D6DC',
                    },
                  }),
                }}
                required
                className="w-full"
                placeholder="Month"
                value={selectedMonth}
                options={months}
                onChange={handleMonthChange}
              />
              <Select
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    border: state.isFocused
                      ? '1px solid #3949AB'
                      : '1px solid #D2D6DC',
                    color: state.isFocused ? '#3949AB' : '#D2D6DC',
                    boxShadow: state.isFocused ? '0 0 0 1px #3949AB' : 'none',
                    '&:hover': {
                      border: state.isFocused
                        ? '1px solid #3949AB'
                        : '1px solid #D2D6DC',
                    },
                  }),
                }}
                required
                className="w-full"
                placeholder="Year"
                value={selectedYear}
                options={years}
                onChange={handleYearChange}
              />
            </div>
          </div>
        )}
        {steps === 2 && (
          <div>
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
                      intrests.includes(intrest) && 'bg-primary text-white'
                    } text-sm p-2 border rounded-lg cursor-pointer hover:bg-primary hover:text-white`}
                    onClick={() => {
                      if (intrests.includes(intrest)) {
                        setIntrests(intrests.filter((i) => i !== intrest))
                      } else setIntrests([...intrests, intrest])
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
                      skills.includes(skill) && 'bg-primary text-white'
                    } text-sm p-2 border rounded-lg cursor-pointer hover:bg-primary hover:text-white`}
                    onClick={() => {
                      if (skills.includes(skill)) {
                        setSkills(skills.filter((i) => i !== skill))
                      } else setSkills([...skills, skill])
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
                      sports.includes(sport) && 'bg-primary text-white'
                    } text-sm p-2 border rounded-lg cursor-pointer hover:bg-primary hover:text-white`}
                    onClick={() => {
                      if (sports.includes(sport)) {
                        setSports(sports.filter((i) => i !== sport))
                      } else setSports([...sports, sport])
                    }}
                  >
                    {sport}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="flex w-full items-center justify-between gap-4">
          {steps > 0 && (
            <SecondaryButton
              type="button"
              onClick={() => {
                if (steps > 0) setSteps(steps - 1)
              }}
              title="Back"
            />
          )}
          <PrimaryButton title="Next" disabled={loading}>
            {loading && (
              <Spinner style={{ width: 50, height: 50, color: '#3949ab' }} />
            )}
          </PrimaryButton>
        </div>
      </form>
    </div>
  )
}
