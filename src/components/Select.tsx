interface TextInputProps {
  label: string
  options: Array<{ label: string; value: string | number }>
  disabled?: boolean | false
  required?: boolean | false
  rest: any
  error?: string
}

export default function Select(props: TextInputProps) {
  return (
    <div className="mt-6 w-full">
      <label className="block mb-2 text-sm font-medium text-primary">
        {props.label}
      </label>
      <select
        defaultValue=""
        {...props.rest}
        className="bg-gray-50 outline-none border focus:border-primary border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        required={props.required}
        disabled={props.disabled}
      >
        <option value="" disabled>
          Select an option
        </option>
        {props.options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {props.error && (
        <label className="text-xs text-red-500">{props.error}</label>
      )}
    </div>
  )
}
