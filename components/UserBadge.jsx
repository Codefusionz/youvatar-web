import clsxm from '@/lib/clsxm'

const UserBadge = (props) => {
  const { className } = props
  return (
    <>
      <img
        src="/png/girl.png"
        alt="user"
        className={clsxm('rounded-full object-cover', className)}
      />
    </>
  )
}

export default UserBadge
