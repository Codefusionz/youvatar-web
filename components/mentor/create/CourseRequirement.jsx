import TextInput from '@/components/TextInput'

export default function CourseRequirements({ form, setForm }) {
  const handleCreatePrerequisite = async () => {
    try {
      setForm((e) => ({
        ...e,
        coursePrerequisites: [...e.coursePrerequisites, ''],
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateFor = async () => {
    try {
      setForm((e) => ({
        ...e,
        courseFor: [...e.courseFor, ''],
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const handleCoursePrerequisitesChange = async (x, i) => {
    try {
      const updated = form.coursePrerequisites.map((e, j) => {
        if (i === j) return x
        return e
      })
      setForm((e) => ({ ...e, coursePrerequisites: updated }))
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateForChange = async (x, i) => {
    try {
      const updated = form.courseFor.map((e, j) => {
        if (i === j) return x
        return e
      })

      setForm((e) => ({ ...e, courseFor: updated }))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col mt-4">
      <h1 className="text-lg font-bold">
        What are the a or prerequisites for taking your course?
      </h1>
      <span className="text-gray-500 mt-2">
        List the required skills, experience, tools or equipment learners should
        have prior to taking your course.If there are no requirements, use this
        space as an opportunity to lower the barrier for beginners.
      </span>
      {form.coursePrerequisites.map((e, i) => (
        <TextInput
          key={i}
          placeholder="Example: Basic knowledge of HTML and CSS"
          value={e}
          onChange={(x) => handleCoursePrerequisitesChange(x, i)}
        />
      ))}
      <button
        type="button"
        onClick={handleCreatePrerequisite}
        className="bg-primary mt-4 rounded-md p-2 w-48 font-semibold text-sm text-white"
      >
        Add More
      </button>
      <h1 className="font-bold text-lg mt-8">Who is this course for?</h1>
      <span className="text-gray-500 mt-2">
        Write a clear description of the intended learners for your course who
        will find your course content valuable.This will help you attract the
        right learners to your course.
      </span>
      {form.courseFor.map((e, i) => (
        <TextInput
          key={i}
          placeholder="Example: Basic knowledge of HTML and CSS"
          value={e}
          onChange={(e) => handleCreateForChange(e, i)}
        />
      ))}
      <button
        type="button"
        onClick={handleCreateFor}
        className="bg-primary mt-4 mb-6 rounded-md p-2 w-48 font-semibold text-sm text-white"
      >
        Add More
      </button>
    </div>
  )
}
