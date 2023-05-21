import TextInput from '@/components/TextInput'
import { useEffect } from 'react'
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from 'react-hook-form'

type CourseRequirementsProps = {
  register: UseFormRegister<any>
  control: Control<any>
  errors: FieldErrors<any>
}

export default function CourseRequirements(props: CourseRequirementsProps) {
  const {
    append: prerequisitesAppend,
    remove: prerequisitesRemove,
    fields: prerequisitesFields,
  } = useFieldArray({
    name: 'prerequisites',
    control: props.control,
  })

  const {
    append: courseForAppend,
    remove: courseForRemove,
    fields: courseForFields,
  } = useFieldArray({
    name: 'courseFor',
    control: props.control,
  })

  useEffect(() => {
    if (prerequisitesFields.length === 0) {
      prerequisitesAppend('')
    }
    if (courseForFields.length === 0) {
      courseForAppend('')
    }
  }, [])

  return (
    <div className="flex flex-col mt-4">
      <h1 className="text-lg font-bold">
        What are the a or prerequisites for taking your course?
      </h1>
      <span className="text-gray-500 mt-2">
        List the required skills, experience, tools or equipment learners should
        have prior to taking your course.If there are no requirements, use this
        space as an opportunity to lower the barrier for beginners.
      </span>
      {prerequisitesFields.map((e, i) => (
        <TextInput
          key={i}
          label="Prerequisite"
          rest={{
            ...props.register(`prerequisites.${i}`, {
              value: true,
              required: 'This field is required',
            }),
          }}
          type="text"
          error={props.errors.prerequisites?.[i]?.message}
          placeholder="Example: Basic knowledge of HTML and CSS"
        />
      ))}
      <button
        type="button"
        onClick={() => prerequisitesAppend('')}
        className="bg-primary mt-4 rounded-md p-2 w-48 font-semibold text-sm text-white"
      >
        Add More
      </button>
      <h1 className="font-bold text-lg mt-8">Who is this course for?</h1>
      <span className="text-gray-500 mt-2">
        Write a clear description of the intended learners for your course who
        will find your course content valuable.This will help you attract the
        right learners to your course.
      </span>
      {courseForFields.map((e, i) => (
        <TextInput
          key={i}
          placeholder="Example: Basic knowledge of HTML and CSS"
          label="Who is this course for?"
          type="text"
          error={props.errors.courseFor?.[i]?.message}
          rest={{
            ...props.register(`courseFor.${i}`, {
              value: true,
              required: 'This field is required',
            }),
          }}
        />
      ))}
      <button
        type="button"
        onClick={() => courseForAppend('')}
        className="bg-primary mt-4 mb-6 rounded-md p-2 w-48 font-semibold text-sm text-white"
      >
        Add More
      </button>
    </div>
  )
}
