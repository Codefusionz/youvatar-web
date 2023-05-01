import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'

const CreatePostModalTwo = ({ setShowPostModalTwo, setModalNo }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center overflow-y-scroll hide-scrollbar z-100">
      <div className="flex flex-col justify-center w-screen h-screen sm:h-500 lg:w-750 rounded-lg">
        <div className="w-full flex items-center justify-between px-5 border-b border-gray-700 bg-black">
          <ArrowLeftIcon
            className="w-6 h-6 text-white"
            onClick={() => setModalNo(1)}
          />
          <div className="flex justify-center items-center">
            <div className="py-4">
              <h3 className="text-lg font-bold text-white text-center">
                Create New Post
              </h3>
            </div>
          </div>
          <div className="flex gap-2">
            <p className="text-blue-600 text-base px-2">Share</p>
            <div>
              <XMarkIcon
                className="h-6 w-6 z-50 text-white cursor-pointer"
                onClick={() => {
                  setShowPostModalTwo(false)
                  setModalNo(1)
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:min-w-1/2 lg:min-w-2/3 sm:min-h-full">
              <img
                src="/png/modal-image.jpg"
                className="w-full h-72 sm:h-auto sm:modal-image-height"
                alt=""
              />
            </div>
            <div className="sm:min-w-1/2 lg:min-w-1/3 sm:overflow-hidden">
              <div className="flex justify-between flex-col h-full bg-black">
                <div className="flex flex-col sm:gap-5">
                  <div className="flex items-center gap-3 px-5 py-5">
                    <img src="/png/photo-1.png" alt="" />
                    <h3 className="text-sm text-white font-semibold">Khaled</h3>
                  </div>
                  <div className="px-3">
                    <textarea
                      className="h-40 sm:h-48 bg-black p-4 text-white border border-gray-600 rounded-md w-full outline-none overflow-y-scroll hide-scrollbar"
                      name=""
                      placeholder="Write Caption"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setModalNo(3)}
            className="bg-primary px-5 py-3 text-white rounded-md "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatePostModalTwo
