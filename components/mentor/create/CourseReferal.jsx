import TextInput from '@/components/TextInput'
import { ClipboardIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

export default function CourseReferal({ form, setForm }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let timer
    if (copied) {
      timer = setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
    return () => clearTimeout(timer)
  }, [copied])

  const couseURl = `https://dev.youvatar.in/mentor/courses/qqqq`
  return (
    <div className="mt-6">
      <TextInput
        label="Course Referral"
        placeholder="Course Referral"
        value={couseURl}
        label2="Copy"
        label2Icon={<ClipboardIcon className="h-4 w-4" />}
        onClickLabel2={() => {
          navigator.clipboard.writeText(couseURl)
          setCopied(true)
        }}
        onChange={(e) => {}}
        // onChange={(e) => setForm({ ...form, referral: e })}
      />
    </div>
  )
}
