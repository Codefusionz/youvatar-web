export default function MentorSidebar() {
  return (
    <div className="col-span-1 hidden bg-primary relative lg:flex items-center justify-center">
      <h1 className="text-white text-[50px] font-black">
        Come teach <br /> with us.
      </h1>
      <img
        className="absolute bottom-0 -right-24"
        src="/png/mentor.png"
        alt="mentor"
        width={300}
        height={300}
        priority
      />
    </div>
  )
}
