import clsxm from '@/lib/clsxm'
import { removeFromCart } from '@/redux/slice/cart'
import { S3_PREFIX } from '@/utils/constants'
import { TrashIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import moment from 'moment'
import { useDispatch } from 'react-redux'

const ShoppingCartCard = ({ courseDetails, getCartCourses }) => {
  const { course } = courseDetails
  const dispatch = useDispatch()
  const handleDeleteCartItem = async () => {
    const confirm = window.confirm('Are you sure you want to delete this item?')
    if (confirm) {
      const { data } = await axios.delete(`/api/cart?id=${courseDetails.id}`)
      if (data.success) {
        dispatch(removeFromCart(course.id))
        getCartCourses()
      } else {
        alert('Something went wrong')
      }
    } else {
      return
    }
  }

  return (
    <div
      className={clsxm(
        'bg-white rounded-[14px] mb-8',
        'border border-solid border-white',
        'flex justify-between items-end '
      )}
    >
      <div className="flex p-4">
        <img
          src={S3_PREFIX + course?.courseThumbnail}
          alt="course"
          className="lg:w-[340px] w-[120px] h-20 lg:h-[240px] object-cover rounded-lg"
        />
        <div className="ml-2.5 lg:mt-8">
          <div className="lg:mb-8">
            <div className="lg:text-[32px] text-sm font-medium mb-2 text-black">
              {course?.title}
            </div>
            <div className="text-xs lg:text-[20px] font-light text-black">
              Starts from{' '}
              <span className="font-bold">
                {' '}
                {course?.classStartDate &&
                  moment(course?.classStartDate).format('DD MMMM YYYY')}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-base lg:text-4xl font-bold text-black mr-1.5">
              ₹{course?.price}
            </div>
            <div className="text-muted text-[10px] lg:text-lg font-medium mr-1.5 line-through">
              ₹3000
            </div>
            <div className="text-black text-[10px] lg:text-lg font-medium">
              90% off
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end pb-2 lg:pb-8 pr-4">
        <div
          className={clsxm(
            'border border-solid border-red-700',
            ' rounded py-3 px-1.5 lg:px-5 lg:w-[110px] w-10 cursor-pointer',
            'flex items-center justify-center'
          )}
          onClick={handleDeleteCartItem}
        >
          <TrashIcon className="lg:w-[20px] w-3 h-3 lg:h-[20px] text-red-700" />
        </div>
      </div>
    </div>
  )
}

export default ShoppingCartCard
