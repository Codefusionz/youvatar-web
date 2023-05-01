import { useSelector } from 'react-redux'

const StatusImage = () => {
  const user = useSelector((state) => state.user.data)
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="relative mb-1 w-16">
        <img
          className="aspect-square w-full rounded-full"
          src={'/png/profile.png'}
        />
        <div className="w-2.5 h-2.5 absolute bg-green right-0 bottom-0 rounded-full"></div>
      </div>
      <p className="text-xs flex justify-center text-center">Priyank</p>
    </div>
  )
}

export default StatusImage
