import StatusImage from './StatusImage'

const Carousel = () => {
  return (
    <div className="flex gap-3 w-full overflow-x-scroll p-2 px-4 overflow-y-hidden scrollbar-none">
      <StatusImage />
      <StatusImage />
      <StatusImage />
      <StatusImage />
      <StatusImage />
      <StatusImage />
      <StatusImage />
      <StatusImage />
    </div>
  )
}

export default Carousel
