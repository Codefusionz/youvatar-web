import ShoppingCartCard from '@/components/cards/ShoppingCartCard'
import TextInput from '@/components/TextInput'
import clsxm from '@/lib/clsxm'
import React, { useEffect, useState } from 'react'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import axios from 'axios'

const Cart = () => {
  const router = useRouter()

  const [cartCourses, setCartCourses] = useState([])

  const handleBack = () => {
    router.back()
  }

  const getCartCourses = async () => {
    const { data } = await axios.get('/api/cart')
    setCartCourses(data?.data)
  }

  useEffect(() => {
    getCartCourses()
  }, [])

  const handleCheckout = async () => {
    const { data } = await axios.post('/api/checkout')
    if (data) {
      router.push('/student/dashboard')
    }
  }

  const totalSum = cartCourses?.reduce(
    (acc, curr) => acc + curr.course.price,
    0
  )

  return (
    <div className="bg-primary h-full w-full pt-[72px] lg:px-14 px-5">
      <div className="flex items-center mb-9">
        <span onClick={handleBack}>
          <ArrowLeftIcon className="w-[40px] h-[40px] text-white cursor-pointer" />
        </span>
        <div className="text-3xl lg:text-[40px] font-bold ml-5  text-white">
          Shopping Cart
        </div>
      </div>
      <div className={clsxm('flex flex-col lg:flex-row  justify-between')}>
        <div>
          {cartCourses?.map((course) => (
            <ShoppingCartCard
              key={course.id}
              courseDetails={course}
              getCartCourses={getCartCourses}
            />
          ))}
        </div>

        <div className="bg-white lg:h-[703px] mb-7 lg:mb-0 p-10 ">
          <div className="text-xl font-medium text-black ">
            enter promo code or gift card number
          </div>
          <TextInput placeholder={'Enter Coupon Code'} />
          <button className="bg-primary text-white rounded w-full  font-semibold text-base px-5 py-3 mt-4">
            Apply now
          </button>
          <div className="mt-32">
            <div className="flex justify-between items-center mb-5">
              <div className="text-xl font-medium">subtotal:</div>
              <div className="text-xl font-medium">₹{totalSum}</div>
            </div>
            <div className="flex justify-between items-center mb-5">
              <div className="text-xl font-medium">Coupon offer</div>
              <div className="text-xl font-medium">₹0.00</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">total:</div>
              <div className="text-xl font-bold">₹{totalSum}</div>
            </div>
            <button
              className="bg-primary text-white rounded w-full  font-semibold text-base px-5 py-3 mt-9"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
