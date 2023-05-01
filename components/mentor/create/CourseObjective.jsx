import TextInput from '@/components/TextInput'

export default function CourseObjective({ form, setForm }) {
  return (
    <div className="mt-6">
      <h1 className="font-bold text-lg">
        What will students learn in your course?
      </h1>
      <span className="mt-2 block">
        You must enter at least 2 <b>learning objectives or outcomes</b> that
        learners can expect to achieve after completing your course.
      </span>
      {form.learningObjectives.map((objective, index) => (
        <TextInput
          key={index}
          type="text"
          placeholder={`Learning objective ${index + 1}`}
          onChange={(e) => {
            const newObjectives = [...form.learningObjectives]
            newObjectives[index] = e
            setForm({
              ...form,
              learningObjectives: newObjectives,
            })
          }}
          value={objective}
        />
      ))}
      <button
        type="button"
        className="mt-6 bg-primary text-white rounded-md px-4 py-2 w-48"
        onClick={() => {
          setForm({
            ...form,
            learningObjectives: [...form.learningObjectives, ''],
          })
        }}
      >
        Add More
      </button>
    </div>
  )
}
