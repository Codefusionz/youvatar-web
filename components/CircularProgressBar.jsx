const CircularProgressBar = (props) => {
  const { percentage } = props

  return (
    <div className="circular-progress-bar shrink-0">
      <div
        className="circular-progress-bar-circle bg-white rounded-full absolute top-0 left-0"
        style={{ transform: `rotate(${(percentage / 100) * 360}deg)` }}
      ></div>
    </div>
  )
}

export default CircularProgressBar
