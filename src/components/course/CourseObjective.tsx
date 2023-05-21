import TextInput from '@/components/TextInput'
import { useEffect } from 'react'
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from 'react-hook-form'

type CourseObjectiveProps = {
  register: UseFormRegister<any>
  control: Control<any>
  errors: FieldErrors<any>
}

export default function CourseObjective(props: CourseObjectiveProps) {
  const { append, fields } = useFieldArray({
    name: 'learningObjectives',
    control: props.control,
  })

  useEffect(() => {
    if (fields.length === 0) append('')
  }, [])

  return (
    <div className="mt-6">
      <h1 className="font-bold text-lg">
        What will students learn in your course?
      </h1>
      <span className="mt-2 block">
        You must enter at least 2 <b>learning objectives or outcomes</b> that
        learners can expect to achieve after completing your course.
      </span>
      {fields.map((objective, index) => (
        <TextInput
          key={index}
          type="text"
          placeholder={`Learning objective ${index + 1}`}
          label="Learning objective"
          error={props.errors.learningObjectives?.[index]?.message?.toString()}
          rest={{
            ...props.register(`learningObjectives.${index}`, {
              required: {
                value: true,
                message: 'Learning objective is required',
              },
            }),
          }}
        />
      ))}
      <button
        type="button"
        className="mt-6 bg-primary text-white rounded-md px-4 py-2 w-48"
        onClick={() => append('')}
      >
        Add More
      </button>
    </div>
  )
}
