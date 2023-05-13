import Image from 'next/image'

export default function SocialButton(props: any) {
  return (
    <button
      className="w-full text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center mr-2 mb-2"
      {...props}
    >
      <Image
        src={props.src}
        width={24}
        height={24}
        className="mr-2"
        alt={props.alt}
      />
      {props.children}
    </button>
  )
}
