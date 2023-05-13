interface TextAreaProps {
  placeholder: string
  label: string
  label2?: string
  value: string
  onChange: (value: string) => void
  type: string
  error?: string
  onClickLabel2?: () => void
  label2Icon?: React.ReactNode
  wrapperClassName?: string
  disabled?: boolean
}

export default function TextInput(props: TextAreaProps) {
  return (
    <div className="mt-6 w-full">
      <label className="block mb-2 text-sm font-medium text-primary">
        {props.label}
      </label>
      <textarea
        className="bg-gray-50 outline-none border focus:border-[#3949AB] border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        required
        disabled={props.disabled}
        rows={6}
      />
    </div>
  )
}
