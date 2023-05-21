import { default as Picker } from 'react-datepicker'
import { Control, Controller, UseFormRegister } from 'react-hook-form'

type DatePickerProps = {
  name: string
  register: UseFormRegister<any>
  control: Control<any>
  error?: string
  label?: string
  disabled?: boolean
  format?: string
}

export default function DatePicker(props: DatePickerProps) {
  return (
    <div className="mt-6 w-full">
      {props.label && (
        <label className="block mb-2 text-sm font-medium text-primary">
          {props.label}
        </label>
      )}
      <Controller
        name={props.name}
        control={props.control}
        rules={{
          required: { value: true, message: `${props.name} is required` },
        }}
        render={({ field }) => (
          <Picker
            dateFormat={props.format}
            disabled={props.disabled}
            selected={field.value}
            className="outline-none border focus:border-primary border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400 "
            {...field}
          />
        )}
      />
      {props.error && (
        <label className="text-xs text-red-500">{props.error}</label>
      )}
    </div>
  )
}
