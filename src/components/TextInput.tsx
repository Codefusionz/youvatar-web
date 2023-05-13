interface TextInputProps {
  placeholder: string
  label: string
  type: string
  disabled?: boolean | false
  required?: boolean | false
  rest: any
  error?: string
}

export default function TextInput(props: TextInputProps) {
  return (
    <div className="mt-6 w-full">
      <label className="block mb-2 text-sm font-medium text-primary">
        {props.label}
      </label>
      <input
        type={props.type}
        className="bg-gray-50 outline-none border focus:border-primary border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        placeholder={props.placeholder}
        {...props.rest}
        required={props.required}
        disabled={props.disabled}
      />
      {props.error && (
        <label className="text-xs text-red-500">{props.error}</label>
      )}
    </div>
  )
}
