import TextInput from '@/components/TextInput'
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form'

type CourseMessageProps = {
  register: UseFormRegister<any>
  control: Control<any>
  errors: FieldErrors<any>
}

export default function CourseMessage(props: CourseMessageProps) {
  return (
    <div className="mt-6 flex flex-col gap-4">
      <TextInput
        label="Welcome Message"
        type="textarea"
        error={props.errors.welcomeMessage?.message?.toString()}
        placeholder="Welcome to the course!"
        rest={{
          ...props.register('welcomeMessage', {
            value: true,
            required: 'This field is required',
          }),
        }}
      />
      <TextInput
        label="Congragulations Message"
        type="textarea"
        placeholder="Congratulations on completing the course!"
        error={props.errors.congratulationsMessage?.message?.toString()}
        rest={{
          ...props.register('congratulationsMessage', {
            value: true,
            required: 'This field is required',
          }),
        }}
      />
    </div>
  )
}
