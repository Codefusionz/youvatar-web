import {
  CheckCircleIcon,
  PencilIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from 'react-hook-form'

type CourseCirriculumProps = {
  register: UseFormRegister<any>
  control: Control<any>
  errors: FieldErrors<any>
}

export default function CourseCirriculum(props: CourseCirriculumProps) {
  const [currentEditModule, setCurrentEditModule] = useState<number | null>(
    null
  )
  const [currentEditLecture, setCurrentEditLecture] = useState(null)

  const { append, remove, fields, update } = useFieldArray({
    name: 'modules',
    control: props.control,
  })

  const handleCreateModule = async () => {
    const moduleId = Date.now()
    append({
      id: moduleId,
      title: 'My new Module',
      lectures: [{ id: Date.now(), title: 'Introduction' }],
    })
    setCurrentEditModule(moduleId)
  }

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
      case 'Escape':
        setCurrentEditModule(null)
        setCurrentEditLecture(null)
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (fields.length === 0) handleCreateModule()
  }, [])

  return (
    <div>
      <p className="text-#121212] mt-2">
        Start putting together your course by creating sections, lectures and
        practice
      </p>
      {fields.map((module, index) => (
        <div
          key={module.id}
          className="flex flex-col border border-gray-300 rounded mt-4 p-4"
        >
          <div className="flex flex-row w-full items-center justify-between gap-2">
            <div className="font-bold text-lg flex flex-row w-full gap-2">
              <span className="whitespace-nowrap">{`Module ${
                index + 1
              }: `}</span>
              <input
                type="text"
                className="outline-none w-full"
                {...props.register(`modules.${index}.title` as const, {
                  required: {
                    value: true,
                    message: 'Module title is required',
                  },
                })}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="flex gap-4 items-center">
              {currentEditModule === module.id ? (
                module.title.length > 0 ? (
                  <CheckCircleIcon
                    className="h-5 w-5 text-green-500 cursor-pointer"
                    onClick={() => setCurrentEditModule(null)}
                  />
                ) : (
                  <XCircleIcon className="h-5 w-5 text-red-500 cursor-pointer" />
                )
              ) : (
                <PencilIcon
                  className="h-5 w-5 text-gray-500 cursor-pointer"
                  onClick={() => {
                    setCurrentEditModule(module.id)
                    setCurrentEditLecture(null)
                  }}
                />
              )}
            </div>
          </div>
          {module.lectures.map((lecture, lectureIndex) => (
            <div
              key={lectureIndex}
              className="block md:flex flex-col sm:flex-row border border-gray-300 justify-between items-center m-2 p-2 rounded"
            >
              <div className="flex items-center justify-between w-full gap-2">
                <div>
                  <b>Day {lectureIndex + 1}</b>
                  {currentEditLecture === lecture.id ? (
                    <input
                      type="text"
                      className="outline-none w-full"
                      {...props.register(
                        `modules.${index}.lectures.${lectureIndex}.title` as const,
                        {
                          required: {
                            value: true,
                            message: 'Lecture title is required',
                          },
                        }
                      )}
                      onKeyDown={handleKeyDown}
                    />
                  ) : (
                    <span
                      className="block"
                      onClick={() => {
                        setCurrentEditLecture(lecture.id)
                        setCurrentEditModule(null)
                      }}
                    >
                      {lecture.title}
                    </span>
                  )}
                </div>
                <div className="flex gap-4">
                  {currentEditLecture === lecture.id ? (
                    lecture.title.length > 0 ? (
                      <CheckCircleIcon
                        className="h-4 w-4 text-green-500 cursor-pointer"
                        onClick={() => setCurrentEditLecture(null)}
                      />
                    ) : (
                      <XCircleIcon className="h-4 w-4 text-red-500 cursor-pointer" />
                    )
                  ) : (
                    <PencilIcon
                      className="h-4 w-4 text-gray-500 cursor-pointer"
                      onClick={() => {
                        setCurrentEditLecture(lecture.id)
                        setCurrentEditModule(null)
                      }}
                    />
                  )}
                  {currentEditLecture !== lecture.id && (
                    <TrashIcon
                      className="h-4 w-4 text-red-500 cursor-pointer"
                      onClick={() =>
                        update(index, {
                          ...module,
                          lectures: module.lectures.filter(
                            (e) => e.id !== lecture.id
                          ),
                        })
                      }
                    />
                  )}
                </div>
              </div>
              <div className="flex gap-2 m-2"></div>
            </div>
          ))}
          <div className="w-full flex justify-between items-end flex-col gap-2">
            <button
              type="button"
              onClick={() =>
                update(index, {
                  ...module,
                  lectures: [
                    ...module.lectures,
                    { id: Date.now(), title: 'new lecture' },
                  ],
                })
              }
              className="bg-primary text-white rounded px-3 py-2 text-xs lg:text-sm w-fit mr-1"
            >
              Add next lecture
            </button>
            <div className="flex">
              <button
                type="button"
                className="bg-primary text-white rounded px-3 py-2 text-xs lg:text-sm mr-1"
              >
                Add Module Resouce
              </button>
              <button
                type="button"
                className="bg-red-500 text-white rounded px-3 py-2 text-xs lg:text-sm"
                onClick={() => remove(index)}
              >
                Delete Module
              </button>
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={handleCreateModule}
        className="bg-primary text-white rounded px-3 py-2 text-sm w-fit mt-4"
      >
        Add New Module
      </button>
    </div>
  )
}
