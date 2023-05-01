import Progressbar from '@/components/Progressbar'
import Spinner from '@/components/Spinner'
import { TrashIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function DraftCourses() {
  const router = useRouter()
  const [draftCourses, setDraftCourses] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchDraftCourses = async () => {
    setLoading(true)
    try {
      const response = await axios.get('/api/course/draft')
      setDraftCourses(response.data.data)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const deleteDraft = async (id) => {
    try {
      await axios.delete(`/api/course/draft?id=${id}`)
      setDraftCourses((prev) => prev.filter((course) => course.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDraftCourses()
  }, [])

  if (loading)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner height={50} width={50} color="#3949ab" />
      </div>
    )

  return (
    <div className="max-w-[1000px] mx-auto bg-primary rounded-md">
      <div className="flex flex-row items-center justify-between p-8">
        <h1 className="text-white text-xl">Jump into course creation now</h1>
        <Link
          href="/mentor/dashboard/courses/create"
          className="text-primary bg-white w-52 rounded-md p-2 text-center"
        >
          Create course
        </Link>
      </div>
      <div className="bg-white p-8">
        <h1 className="font-bold text-lg mb-4">Drafts</h1>
        {draftCourses.map((course) => {
          const parsed = JSON.parse(course.content)
          return (
            <div
              className="p-4 border border-gray-300 rounded-md items-center justify-between gap-4 flex text-primary mt-4"
              key={course.id}
            >
              <div
                onClick={() => {
                  router.push(
                    `/mentor/dashboard/courses/create?draftId=${course.id}`
                  )
                }}
                className="gap-6 flex cursor-pointer items-center w-full whitespace-nowrap"
              >
                <span className="capitalize lg:w-52">{parsed.title}</span>
                <div className="w-full max-w-lg flex items-center gap-2">
                  <span className="text-gray-500">Finsh course</span>
                  <Progressbar color="#3949ab" progress={course.progress} />
                </div>
              </div>
              <TrashIcon
                onClick={() => deleteDraft(course.id)}
                className="h-6 w-6 text-red-500 cursor-pointer"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DraftCourses
DraftCourses.auth = true
