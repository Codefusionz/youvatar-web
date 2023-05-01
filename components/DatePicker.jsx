import { default as Picker } from 'react-datepicker'

export default function DatePicker({
  label,
  value,
  onChange,
  disabled = false,
}) {
  return (
    <div className="mt-6 w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium text-primary">
          {label}
        </label>
      )}
      <Picker
        disabled={disabled}
        className="outline-none border focus:border-primary border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400 "
        selected={value}
        onChange={onChange}
      />
    </div>
  )
}
