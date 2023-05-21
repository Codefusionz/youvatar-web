import TextInput from '@/components/TextInput'
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form'

type CoursePricingProps = {
  register: UseFormRegister<any>
  control: Control<any>
  errors: FieldErrors<any>
}

export default function CoursePricing(props: CoursePricingProps) {
  return (
    <div className="mt-6">
      <TextInput
        label="Course Price"
        placeholder="1000"
        error={props.errors.price?.message?.toString()}
        type="number"
        rest={{
          ...props.register('price', {
            value: true,
            required: 'This field is required',
          }),
        }}
      />
    </div>
  )
}
