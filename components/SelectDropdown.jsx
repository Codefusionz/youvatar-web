import Select from 'react-select'

export default function SelectDropdown({
  label,
  defaultOption,
  options,
  value,
  onChange,
  required,
  multiple,
}) {
  return (
    <div className="mt-6 w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium text-primary">
          {label}
        </label>
      )}
      <Select
        styles={{
          control: (provided, state) => ({
            ...provided,
            border: state.isFocused ? '1px solid #3949AB' : '1px solid #D2D6DC',
            color: state.isFocused ? '#3949AB' : '#D2D6DC',
            boxShadow: state.isFocused ? '0 0 0 1px #3949AB' : 'none',
            '&:hover': {
              border: state.isFocused
                ? '1px solid #3949AB'
                : '1px solid #D2D6DC',
            },
          }),
        }}
        isMulti={multiple}
        onChange={(e) => onChange(e)}
        options={options}
        defaultOption={defaultOption}
        required={required}
        value={value}
      />
    </div>
  )
}
