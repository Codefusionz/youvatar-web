import { Control, Controller } from 'react-hook-form'
import { default as ReactSelect } from 'react-select'

interface TextInputProps {
  label: string
  options: Array<{ label: string; value: string | number }>
  disabled?: boolean | false
  required?: boolean | true
  placeholder: string
  error?: string
  control: Control<any>
  name: string
  multiple?: boolean
}

export default function Select(props: TextInputProps) {
  return (
    <div className="mt-6 w-full">
      <label className="block mb-2 text-sm font-medium text-primary">
        {props.label}
      </label>
      <Controller
        name={props.name}
        control={props.control}
        rules={{
          required: { value: true, message: `${props.label} is required` },
        }}
        render={({ field }) => (
          <ReactSelect
            options={props.options}
            required={props.required}
            placeholder={props.placeholder}
            isMulti={props.multiple}
            {...field}
            styles={{
              control: (provided, state) => ({
                ...provided,
                border: state.isFocused
                  ? '1px solid #3949AB'
                  : '1px solid #D2D6DC',
                color: state.isFocused ? '#3949AB' : '#D2D6DC',
                padding: '0.1rem',
                boxShadow: state.isFocused ? '0 0 0 1px #3949AB' : 'none',
                '&:hover': {
                  border: state.isFocused
                    ? '1px solid #3949AB'
                    : '1px solid #D2D6DC',
                },
              }),
            }}
          />
        )}
      />
      {props.error && (
        <label className="text-xs text-red-500">{props.error}</label>
      )}
    </div>
  )
}
