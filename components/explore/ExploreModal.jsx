import clsxm from '@/lib/clsxm'
import { addToCart, removeFromCart } from '@/redux/slice/cart'
import { S3_PREFIX } from '@/utils/constants'
import { createProfileImage } from '@/utils/helpers'
import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  ShareIcon,
  StarIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Accordion from '../Accordian'
import Spinner from '../Spinner'
import UserBadge from '../UserBadge'

const ExploreModal = ({ courseId, onClose }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showMore, setShowMore] = useState(false)
  const [loading, setLoading] = useState(false)
  const { courseData } = useSelector((state) => state.cart)
  const [batchId, setBatchId] = useState(null)
  const [cartId, setCartId] = useState(null)
  const [data, setData] = useState(null)

  const getStudentOrders = async () => {
    try {
      const { data } = await axios.get(`/api/student/course/${courseId}`)

      if (!data?.success) return

      setData(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getStudentOrders()
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleAddToCart = async () => {
    try {
      if (courseData.find((item) => item.id === data?.data?.id)) {
        const { data } = await axios.delete(`/api/cart?id=${cartId}`)
        if (data.success) {
          dispatch(removeFromCart(data?.data?.id))
        } else {
          alert('Something went wrong')
        }
      } else {
        const { data } = await axios.post('/api/cart', {
          courseId: data.courseDetails.courseId,
          batchId,
        })

        if (data) {
          dispatch(addToCart([...courseData, data.data]))
          setCartId(data?.cartId)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleBuyCourse = async () => {
    if (courseData.find((item) => item.id === data.courseDetails.id)) {
      router.push('/cart')
      return
    } else {
      const { data } = await axios.post('/api/cart', {
        courseId: data.courseDetails.courseId,
        batchId,
      })

      if (data) {
        setLoading(true)
        dispatch(addToCart([...courseData, data.data]))
        router.push('/cart')
      } else {
        alert('Something went wrong')
        setLoading(false)
      }
    }
  }

  const isInCart = courseData.find((item) => item.id === data?.data?.id)

  if (!data)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner height={50} width={50} color="#3949ab" />
      </div>
    )

  return (
    <div className="lg:flex w-full h-full md:h-[90vh] md:w-[90vw] bg-black rounded-md">
      <XMarkIcon
        className="h-6 w-6 z-50 text-white fixed top-5 right-5 cursor-pointer"
        onClick={onClose}
      />
      <img
        src={S3_PREFIX + data.courseThumbnail}
        alt="course"
        className="w-full h-full max-w-1/2 object-contain brightness-75 overflow-hidden rounded-md"
      />
      {console.log(data.mentor?.user?.displayName)}
      <div className="w-full overflow-y-scroll scrollable-div flex-1 p-7 bg-white pb-8">
        <div className="flex items-center gap-6 mb-4 flex-col lg:flex-row">
          <div className="flex gap-3 items-center">
            <img
              className="rounded-full aspect-square object-cover w-12 h-full border border-white"
              src={
                data.mentor?.user?.image
                  ? S3_PREFIX + data.mentor?.user?.image
                  : createProfileImage(data.mentor?.user?.displayName)
              }
              alt="mentor"
            />
            <h3 className="text-xl font-bold">{data.title}</h3>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-2xl font-bold text-black">4.6</p>
            <div className="flex">
              <StarIcon className="w-6 h-6 text-yellow-400" fill="#FFD600" />
              <StarIcon className="w-6 h-6 text-yellow-400" fill="#FFD600" />
              <StarIcon className="w-6 h-6 text-yellow-400" fill="#FFD600" />
              <StarIcon className="w-6 h-6 text-yellow-400" fill="#FFD600" />
              <StarIcon className="w-6 h-6 text-yellow-400" fill="#FFD600" />
            </div>
          </div>
        </div>
        <div className="bg-gray">
          <div className="flex items-center flex-col lg:flex-row gap-5 mb-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <div className="text-xs text-black opacity-60 font-bold mr-3">
                    ₹{data.price}
                  </div>
                  <div className="text-xs text-black opacity-60 font-medium line-through mr-4">
                    ₹90% Off
                  </div>
                </div>
                <p className="text-primary text-base font-bold">₹500</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <p className="text-xs text-black opacity-60">Duration</p>
                <span className="font-bold text-base text-primary">
                  {data.classDuration} Days
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <p className="text-xs text-black opacity-60">Starts from</p>
                <span className="font-bold text-base text-primary">
                  30th Match
                </span>
              </div>
            </div>
          </div>

          {!data?.isPurchased && (
            <div className="flex flex-wrap gap-4">
              {data.batches?.map((batch, index) => (
                <div
                  key={batch.id}
                  className={clsxm(
                    'text-gray-700 border-2 cursor-pointer text-sm font-medium lg:font-semibold px-2 bg-white rounded',
                    batchId === batch.id
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-300'
                  )}
                  onClick={() => {
                    setBatchId(batch.id)
                  }}
                >
                  <div className="w-fit flex items-center">
                    <span className="text-xs">Batch {index + 1} </span>{' '}
                    <span className="mx-1">|</span>{' '}
                    <span className="text-xs">{batch.timeSlot}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-5 flex-wrap py-8">
            <button className="text-base text-white bg-primary py-2.5 px-14 rounded-lg">
              Add To Cart
            </button>
            <button className="text-base text-white bg-primary py-2.5 px-14 rounded-lg">
              Add To Cart
            </button>
            <div className="bg-primary py-3 px-2.5 rounded-lg">
              <HeartIcon className="w-6 h-6 text-white"></HeartIcon>
            </div>
          </div>

          {/* <div className="mb-8 flex flex-col lg:flex-row items-center gap-2 justify-between">
            {!studentCourses?.isPurchased && (
              <button
                className={clsxm(
                  '  w-full  rounded-md py-2.5 px-5 whitespace-nowrap bg-primary',
                  isInCart
                    ? 'border border-solid border-red-700 text-red-800 bg-white'
                    : 'border border-solid border-primary text-white',
                  !batchId || studentCourses?.isPurchased
                    ? ' opacity-50 text-white cursor-not-allowed'
                    : ''
                )}
                onClick={handleAddToCart}
                disabled={!batchId || studentCourses?.isPurchased}
              >
                {isInCart ? 'Remove from cart' : 'Add to cart'}
              </button>
            )}
            {studentCourses?.isPurchased ? (
              <button
                className={clsxm(
                  'bg-primary text-white rounded w-full  whitespace-nowrap font-semibold text-base px-5 py-3'
                )}
                onClick={() => router.push(`/student/courses`)}
              >
                {loading && <Spinner height={19} width={19} color="#fff" />}
                Continue to course
              </button>
            ) : (
              <button
                className={clsxm(
                  'bg-primary text-white rounded w-full   font-semibold text-base px-5 py-3',
                  !batchId || studentCourses?.isPurchased
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                )}
                onClick={() =>
                  isInCart ? router.push('/cart') : handleBuyCourse
                }
                disabled={!batchId || studentCourses?.isPurchased}
              >
                {loading && <Spinner height={19} width={19} color="#fff" />}
                {isInCart ? 'Checkout' : 'Buy Now'}
              </button>
            )}
          </div> */}
        </div>
        <div className="text-base font-medium text-black mb-4">Description</div>
        <div className="flex">
          <div className="text-sm text-black font-normal text-start capitalize">
            {data.description}
          </div>
        </div>

        {showMore && (
          <>
            <div className="mt-5 mb-1.5">Who is this course for?</div>
            {data.courseFor?.set?.map((item) => (
              <div className="flex items-center mb-1" key={item}>
                <li className="text-sm">{item}</li>
              </div>
            ))}

            <div className="mt-4 mb-2">What you’ll learn</div>
            {data.learningObjectives?.set?.map((item) => (
              <div className="flex items-center" key={item}>
                <li className="text-sm ">{item}</li>
              </div>
            ))}

            <div className="my-4">Course Syllabus</div>
            <div className="">
              {data.batches &&
                data.batches[0]?.modules?.map((module, index) => (
                  <Accordion
                    title={`Module ${index + 1}:
                 ${module?.title}`}
                    key={module.title}
                  >
                    {module?.lectures?.map((lesson) => (
                      <div className="flex items-center mb-1" key={lesson.id}>
                        <li className="text-sm">{lesson.title}</li>
                      </div>
                    ))}
                  </Accordion>
                ))}
            </div>

            <div className="mt-4 mb-2">Requirements</div>

            {data.coursePrerequisites?.set?.map((item) => (
              <div className="flex items-center" key={item}>
                <li className="text-sm">{item}</li>
              </div>
            ))}
          </>
        )}
        <button
          className="text-primary font-semibold text-sm whitespace-nowrap mt-2"
          onClick={() => setShowMore(!showMore)}
        >
          {!showMore ? 'Show More' : 'Show Less'}
        </button>
        <div className="border hidden lg:flex border-muted opacity-30 my-5 " />
        <div className="mb-5 hidden lg:flex">
          <UserBadge className="w-10 h-10" />
          <div className="mx-1 md:ml-2">
            <h3 className="text-base font-semibold text-black">
              Sneha Trivedi
            </h3>
            <p className="text-sm text-black mb-1.5">
              hendrerit dui. Ultricies quis dictum commodo sit ipsum netus
              adipiscing Lorem ipsum dolor sit amet consectetur.
            </p>
            <div className="text-xs text-black opacity-60">24th nov 2023</div>
          </div>
        </div>
        <div className="mb-5 hidden lg:flex">
          <UserBadge className="w-10 h-10" />
          <div className="mx-1 md:ml-2">
            <h3 className="text-base font-semibold text-black">
              Sneha Trivedi
            </h3>
            <p className="text-sm text-black mb-1.5">
              hendrerit dui. Ultricies quis dictum commodo sit ipsum netus
              adipiscing Lorem ipsum dolor sit amet consectetur.
            </p>
            <div className="text-xs text-black opacity-60 ">24th nov 2023</div>
          </div>
        </div>
        <div className="border text-gray-700 mt-1 mb-5 hidden lg:flex" />
        <div className="items-center justify-between hidden lg:flex">
          <div className="flex gap-4 items-center">
            <HeartIcon className="h-6 w-6" />
            <ChatBubbleOvalLeftIcon className="h-6 w-6" />
            <ShareIcon className="h-6 w-6" />
          </div>
          <div>
            <BookmarkIcon className="h-[20px] w-[20px] " />
          </div>
        </div>
        <div className="border hidden lg:flex border-muted opacity-30 my-5" />
        <div className="flex justify-between">
          <p className="text-base text-black">Add a Comment</p>
          <p className="text-base font-semibold text-primary">Post</p>
        </div>
      </div>
    </div>
  )
}

export default ExploreModal
