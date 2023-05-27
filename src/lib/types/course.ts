export interface Course {
  id?: string
  title: string
  subTitle: string
  description: string
  language: string
  level: string
  category: string
  introFile: string
  thumbnail: string
  learningObjectives: string[]
  prerequisites: string[]
  courseFor: string[]
  welcomeMessage: string
  congratulationsMessage: string
  price: number
  weekOff: string[]
  duration: number
  applicationCloseDate: Date
  classStartDate: Date
  batches: Batch[]
  modules: Module[]
  createdAt: Date
  updatedAt: Date
}

export interface Batch {
  id?: string
  createdAt: Date
  updatedAt: Date
  timeSlot: string
  numberOfStudents: number
  courseId: string
  modules: Module[]
}

export interface Module {
  id?: string
  createdAt: Date
  updatedAt: Date
  title: string
  batchId: string
  lectures: Lecture[]
}

export interface Lecture {
  id?: string
  createdAt: Date
  updatedAt: Date
  title: string
  moduleId: string
  date: string
  isFinished: boolean
}
