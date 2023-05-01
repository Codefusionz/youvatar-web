import {
  CheckCircleIcon,
  PencilIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

export default function CourseCirriculum({ form, setForm }) {
  const [currentEditModule, setCurrentEditModule] = useState(null)
  const [currentEditLecture, setCurrentEditLecture] = useState(null)

  const handleCreateModule = async () => {
    try {
      const moduleId = Date.now()
      setForm((e) => ({
        ...e,
        modules: [
          ...e.modules,
          {
            id: moduleId,
            name: 'My new Module',
            lectures: [
              {
                id: Date.now(),
                name: 'Introduction',
              },
            ],
          },
        ],
      }))
      setCurrentEditModule(moduleId)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateLecture = async (id) => {
    try {
      const lectureId = Date.now()
      const updated = form.modules.map((e) => {
        if (e.id === id) {
          e.lectures.push({
            id: lectureId,
            name: 'My new lecture',
          })
          return e
        }
        return e
      })
      setForm((e) => ({ ...e, modules: updated }))
      setCurrentEditLecture(lectureId)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteModule = async (id) => {
    if (form.modules.length === 1) return

    try {
      const updated = form.modules.filter((e) => e.id !== id)
      setForm((e) => ({ ...e, modules: updated }))
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteLecture = async (moduleId, lectureId) => {
    const module = form.modules.find((e) => e.id === moduleId)
    if (module.lectures.length === 1) return

    try {
      const updated = form.modules.map((e) => {
        if (e.id === moduleId) {
          e.lectures = e.lectures.filter((e) => e.id !== lectureId)
          return e
        }
        return e
      })
      setForm((e) => ({ ...e, modules: updated }))
    } catch (error) {
      console.log(error)
    }
  }

  const updateModuleLabel = (id, name) => {
    const updated = form.modules.map((e) => {
      if (e.id === id) {
        e.name = name
        return e
      }
      return e
    })
    setForm((e) => ({ ...e, modules: updated }))
  }

  const updateLectureLabel = (moduleId, lectureId, name) => {
    const updated = form.modules.map((e) => {
      if (e.id === moduleId) {
        e.lectures = e.lectures.map((e) => {
          if (e.id === lectureId) {
            e.name = name
            return e
          }
          return e
        })
        return e
      }
      return e
    })
    setForm((e) => ({ ...e, modules: updated }))
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
    const timeoutId = setTimeout(() => {
      handleCreateModule()
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div>
      <p className="text-#121212] mt-2">
        Start putting together your course by creating sections, lectures and
        practice
      </p>
      {form.modules.map((module, index) => (
        <div
          key={module.id}
          className="flex flex-col border border-gray-300 rounded mt-4 p-4"
        >
          <div className="flex flex-row w-full items-center justify-between gap-2">
            <div className="font-bold text-lg flex flex-row w-full gap-2">
              <span className="whitespace-nowrap">{`Module ${
                index + 1
              }: `}</span>
              {currentEditModule === module.id ? (
                <input
                  type="text"
                  ref={(input) => input && input.focus()}
                  className="outline-none w-full"
                  value={module.name}
                  required
                  onChange={(e) => updateModuleLabel(module.id, e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              ) : (
                <span
                  onClick={() => {
                    setCurrentEditModule(module.id)
                    setCurrentEditLecture(null)
                  }}
                >
                  {module.name}
                </span>
              )}
            </div>
            <div className="flex gap-4 items-center">
              {currentEditModule === module.id ? (
                module.name.length > 0 ? (
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
                      ref={(input) => input && input.focus()}
                      className="outline-none w-full"
                      value={lecture.name}
                      onKeyDown={handleKeyDown}
                      required
                      onChange={(e) =>
                        updateLectureLabel(
                          module.id,
                          lecture.id,
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <span
                      className="block"
                      onClick={() => {
                        setCurrentEditLecture(lecture.id)
                        setCurrentEditModule(null)
                      }}
                    >
                      {lecture.name}
                    </span>
                  )}
                </div>
                <div className="flex gap-4">
                  {currentEditLecture === lecture.id ? (
                    lecture.name.length > 0 ? (
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
                      onClick={() => handleDeleteLecture(module.id, lecture.id)}
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
              onClick={() => handleCreateLecture(module.id)}
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
                onClick={() => handleDeleteModule(module.id)}
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
