import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'

export default function Dropzone({ label, onPicked, value }) {
  return (
    <div className="flex items-center justify-center w-full mt-6">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center">
          <ArrowUpTrayIcon className="w-10 h-10 mb-3 text-gray-400" />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            {label}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {value ? '1 File Selected' : 'PNG, JPG or GIF (MAX. 800x400px)'}
          </p>
        </div>
        <input
          onChange={(e) => onPicked(e.target.files[0])}
          type="file"
          className="hidden"
        />
      </label>
    </div>
  )
}
