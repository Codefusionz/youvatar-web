import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'

const CreatePostModal = ({ setShowPostModal, setModalNo }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center overflow-y-scroll hide-scrollbar z-100">
      <div className="flex flex-col justify-end w-screen h-screen max-h-500 sm:h-500 xs:w-450 bg-black rounded-lg">
        <XMarkIcon
          className="h-6 w-6 z-50 text-white fixed top-5 right-5 cursor-pointer"
          onClick={() => {
            setShowPostModal(false)
            setModalNo(1)
          }}
        />
        <div className="w-full">
          <div className="py-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white text-center flex-1">
              Create New Post
            </h2>
            <XMarkIcon
              className="h-6 w-6 z-50 text-white text-right cursor-pointer mr-4"
              onClick={() => {
                setShowPostModal(false)
                setModalNo(1)
              }}
            />
          </div>
        </div>
        <div className="flex justify-end flex-col h-full">
          <div className="flex flex-col items-center justify-center gap-5 h-full">
            <PhotoIcon className="w-20 h-20 text-white" />
            <p className="font-semibold text-lg text-white">
              Drag photo and video Here
            </p>
            <div className="mt-1 flex flex-col items-center justify-center">
              <div className="w-full sm:w-auto sm:rounded-md overflow-hidden">
                <label
                  htmlFor="fileInput"
                  className="flex items-center justify-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-medium text-white hover:bg-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  Select From Computer
                </label>
              </div>
              <input
                id="fileInput"
                name="fileInput"
                type="file"
                className="sr-only"
                onchange="document.getElementById('fileInputName').textContent = this.files[0].name"
              />
            </div>
          </div>
          <button
            onClick={() => setModalNo(2)}
            className="bg-primary px-5 py-3 text-white rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatePostModal
