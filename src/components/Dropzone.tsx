import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'

interface TextInputProps {
  label: string
  rest: any
  accept: string
  error?: string
  dataValue?: any
  onChange?: any
}

export default function Dropzone(props: TextInputProps) {
  props.rest.onChange = (e: any) => {
    props.onChange(e.target.files[0])
  }

  return (
    <div className="flex flex-col items-center justify-center w-full mt-6">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center">
          <ArrowUpTrayIcon className="w-10 h-10 mb-3 text-gray-400" />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            {props.label}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {props.dataValue
              ? '1 File Selected'
              : props.accept.replaceAll('image/', '').replaceAll('video/', '') +
                ' Only'}
          </p>
        </div>
        <input
          accept={props.accept}
          type="file"
          className="hidden"
          {...props.rest}
        />
      </label>
      {props.error && (
        <label className="text-xs mt-2 text-red-500">{props.error}</label>
      )}
    </div>
  )
}
