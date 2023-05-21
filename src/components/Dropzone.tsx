import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Control, Controller } from 'react-hook-form'

interface TextInputProps {
  label: string
  accept: string
  error?: string
  name: string
  control: Control<any>
}

export default function Dropzone(props: TextInputProps) {
  const [selected, setSelected] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center w-full mt-6">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center">
          <ArrowUpTrayIcon className="w-10 h-10 mb-3 text-gray-400" />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            {props.label}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {selected
              ? '1 File Selected'
              : props.accept.replaceAll('image/', '').replaceAll('video/', '') +
                ' Only'}
          </p>
        </div>
        <Controller
          control={props.control}
          name={props.name}
          rules={{ required: `${props.name} is required` }}
          render={({ field: { value, onChange, ...field } }) => {
            return (
              <input
                className="hidden"
                {...field}
                value={value?.fileName}
                onChange={(event) => {
                  onChange(event.target.files && event.target.files[0])
                  setSelected(true)
                }}
                accept={props.accept}
                type="file"
              />
            )
          }}
        />
      </label>
      {props.error && (
        <label className="text-xs mt-2 text-red-500">{props.error}</label>
      )}
    </div>
  )
}
