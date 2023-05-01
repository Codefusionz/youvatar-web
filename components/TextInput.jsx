import clsxm from '@/lib/clsxm'

export default function TextInput({
  placeholder,
  label,
  label2,
  value,
  onChange,
  type,
  error,
  onClickLabel2,
  label2Icon,
  wrapperClassName,
  disabled,
}) {
  if (type === 'textarea') {
    return (
      <div className="mt-6 w-full">
        <label className="block mb-2 text-sm font-medium text-primary">
          {label}
        </label>
        <textarea
          className="bg-gray-50 outline-none border focus:border-[#3949AB] border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          disabled={disabled}
          rows={6}
        />
      </div>
    )
  }
  return (
    <div className={clsxm('mt-6 w-full', wrapperClassName)}>
      <>
        <div className="flex items-center justify-between">
          <label className="block mb-2 text-sm font-medium text-primary">
            {label}
          </label>
          <div className="flex flex-row items-center justify-center">
            {label2Icon && (
              <span className="mr-2 h-4 w-4 text-primary">{label2Icon}</span>
            )}
            <label
              onClick={onClickLabel2}
              className="block cursor-pointer text-sm font-medium text-primary"
            >
              {label2}
            </label>
          </div>
        </div>
      </>
      <input
        type={type}
        className="bg-gray-50 outline-none border focus:border-[#3949AB] border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        disabled={disabled}
      />
      {error && <label className="text-xs text-red-500">{error}</label>}
    </div>
  )
}
