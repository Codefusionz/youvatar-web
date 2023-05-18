export default function Progressbar(props: {
  progress: number
  color: string
}) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className="h-2.5 rounded-full"
        style={{
          width: `${props.progress}%`,
          backgroundColor: props.color,
        }}
      ></div>
    </div>
  )
}
