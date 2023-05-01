import {
  ArrowLeftIcon,
  PhotoIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

const CreatePostModalThree = ({ setShowPostModalThree, setModalNo }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center overflow-y-scroll hide-scrollbar z-100">
      <div className="flex flex-col xs:w-full xs:h-full sm:h-[524px] sm:w-[750px] bg-black rounded-lg">
        <XMarkIcon
          className="h-6 w-6 z-50 text-white fixed top-5 right-5 cursor-pointer"
          onClick={() => {
            setShowPostModalThree(false)
            setModalNo(1)
          }}
        />
        <div className="w-full flex items-center justify-between px-5 border-b border-gray-700">
          <ArrowLeftIcon
            className="w-6 h-6 text-white"
            onClick={() => setModalNo(2)}
          />
          <div className="flex justify-center items-center">
            <div className="py-4">
              <h3 className="text-lg font-bold text-white text-center">
                Create New Post
              </h3>
            </div>
          </div>
          <p className="text-blue-600 text-base">Share</p>
        </div>
        <div className="flex gap-5 h-full">
          <div className="hidden sm:block sm:w-1/2">
            <img
              src="/png/modal-two-image-main.jpg"
              alt=""
              className="w-full h-450 rounded-32 p-5"
            />
          </div>
          <div className="w-full sm:w-1/2 sm:pr-5 px-5 sm:px-0">
            <img
              src="/png/modal-two-image-1.jpg"
              className="w-full h-40 py-5"
              alt=""
            />
            <div className="w-full flex gap-3">
              <div className="w-1/3">
                <img
                  src="/png/modal-two-image-2.jpg"
                  className="w-full h-72 py-5"
                  alt=""
                />
              </div>
              <div className="w-2/3">
                <img
                  src="/png/modal-two-image-3.jpg"
                  className="w-full h-72 py-5"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePostModalThree
