import DatePicker from '@/components/DatePicker'
import Select from '@/components/Select'
import TextInput from '@/components/TextInput'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from 'react-hook-form'

type CourseBatchesProps = {
  register: UseFormRegister<any>
  control: Control<any>
  errors: FieldErrors<any>
  duration: number
}

export default function CourseBatches(props: CourseBatchesProps) {
  const durationOptions = [
    { label: '30 minutes', value: 30 },
    { label: '45 minutes', value: 45 },
    { label: '60 minutes', value: 60 },
    { label: '75 minutes', value: 75 },
    { label: '90 minutes', value: 90 },
    { label: '120 minutes', value: 120 },
  ]

  const { append, remove, fields } = useFieldArray({
    name: 'batches',
    control: props.control,
  })

  const getTimeSlots = () => {
    const timeSlots = []
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += props.duration) {
        let hour: any
        hour = i < 10 ? `0${i}` : i
        const minute = j < 10 ? `0${j}` : j
        const suffix = hour < 12 ? 'AM' : 'PM'
        hour = hour % 12 === 0 ? 12 : hour % 12
        timeSlots.push({
          label: `${hour}:${minute} ${suffix}`,
          value: `${hour}:${minute} ${suffix}`,
        })
      }
    }
    return timeSlots
  }

  const weekDayOptions = [
    { label: 'Monday', value: 'Monday' },
    { label: 'Tuesday', value: 'Tuesday' },
    { label: 'Wednesday', value: 'Wednesday' },
    { label: 'Thursday', value: 'Thursday' },
    { label: 'Friday', value: 'Friday' },
    { label: 'Saturday', value: 'Saturday' },
    { label: 'Sunday', value: 'Sunday' },
  ]

  useEffect(() => {
    if (fields.length === 0) append({ timeSlot: '', numberOfStudents: 0 })
  }, [])

  return (
    <div className="mt-4">
      <span>Organise your batches</span>
      <div className="mt-4 border border-gray-300 rounded-md p-4">
        <span className="font-semibold">Configure your batch</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Select
            label="Class Duration"
            error={props.errors.duration?.message?.toString()}
            options={durationOptions}
            placeholder="Class duration"
            name="duration"
            control={props.control}
          />
          <Select
            label="Week Off"
            multiple
            control={props.control}
            name="weekOff"
            error={props.errors.weekOff?.message?.toString()}
            placeholder="week off days"
            options={weekDayOptions}
          />
        </div>
        <div className="grid justify-between grid-cols-1 md:grid-cols-2 gap-2">
          <div className="mr-4 w-full">
            <DatePicker
              format="dd-MM-yyyy"
              label="Application Close Date"
              name="applicationCloseDate"
              control={props.control}
              register={props.register}
              error={props.errors.applicationCloseDate?.message?.toString()}
            />
          </div>
          <div className="flex place-items-end w-full">
            <DatePicker
              format="dd-MM-yyyy"
              label="Class Start Date"
              control={props.control}
              register={props.register}
              error={props.errors.classStartDate?.message?.toString()}
              name="classStartDate"
            />
          </div>
        </div>
      </div>
      {fields.map((batch, index) => (
        <div key={index} className="mt-4 border border-gray-300 rounded-md p-4">
          <div className="flex w-full items-center justify-between">
            <span className="font-semibold">Batch No: {index + 1}</span>
            <TrashIcon
              className="h-5 w-5 text-red-500 cursor-pointer"
              onClick={() => remove(index)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Select
              label="Select Time"
              name={`batches[${index}].timeSlot`}
              control={props.control}
              error={props.errors.batches?.[
                index
              ]?.timeSlot?.message?.toString()}
              placeholder="Select Time"
              options={getTimeSlots()}
            />
            <TextInput
              label="No. of Students"
              type="number"
              placeholder="Enter number of students"
              error={props.errors?.batches?.[
                index
              ]?.numberOfStudents?.message?.toString()}
              rest={{
                ...props.register(
                  `batches[${index}].numberOfStudents` as const,
                  {
                    required: {
                      value: true,
                      message: 'Number Of Students is required',
                    },
                  }
                ),
              }}
            />
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ timeSlot: '', numberOfStudents: null })}
        className="p-2 w-48 my-4 rounded-md font-semibold text-sm bg-primary text-white"
      >
        Add new batch
      </button>
    </div>
  )
}
