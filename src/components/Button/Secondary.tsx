interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

const PrimaryButton: React.FC<ButtonProps> = ({ title, ...props }) => {
  return (
    <button
      className="w-full bg-white disabled:bg-secondary text-primary rounded-md mt-6 p-2 font-semibold flex items-center justify-center"
      {...props}
    >
      {title}
    </button>
  )
}

export default PrimaryButton
