const Footer = () => {
  return (
    <div className="bg-primary px-4">
      <div className="flex flex-col items-center justify-center pt-10 lg:pt-24 pb-10">
        <div className="text-3xl lg:text-5xl font-bold text-white mb-9 lg:mb-28">
          Youvatar
        </div>
        <div className="text-base lg:text-2xl font-medium text-white mb-4">
          Subscribe to get our Newsletter
        </div>
        <div className="flex flex-col gap-3 items-center mb-4">
          <input
            className="bg-transparent p-3 rounded-full border border-solid border-gray-300"
            placeholder="Your Email"
          />
          <button className="py-3 px-3 lg:px-9 rounded-[60px] bg-white text-primary">
            Subscribe
          </button>
        </div>
        <div className="flex items-center justify-center mb-5">
          <div className="text-xs lg:text-xl font-medium text-white">
            Careers
          </div>
          <div className="border border-solid border-[#626381]  h-6 mx-5" />
          <div className="text-xs lg:text-xl font-medium text-white">
            Privacy Policy
          </div>
          <div className="border border-solid border-[#626381]  h-6 mx-5" />
          <div className="text-xs lg:text-xl font-medium text-white">
            Terms & Conditions
          </div>
        </div>
        <div className="text-xl font-medium text-white">© 2023 YOUVATAR</div>
      </div>
    </div>
  )
}

export default Footer
