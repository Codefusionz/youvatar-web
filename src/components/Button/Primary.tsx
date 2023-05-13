import Spinner from '@/components/Spinner'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  loading?: boolean
}

const PrimaryButton: React.FC<ButtonProps> = ({ title, loading, ...props }) => {
  return (
    <button
      className="w-full bg-primary disabled:bg-secondary text-white rounded-md mt-6 p-2 font-semibold flex items-center justify-center"
      disabled={loading}
      {...props}
    >
      {loading && (
        <Spinner style={{ width: 19, height: 19, color: '#3949ab' }} />
      )}
      {title}
    </button>
  )
}

export default PrimaryButton
