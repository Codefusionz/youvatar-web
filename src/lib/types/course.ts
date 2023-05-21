export interface Course {
  id?: string
  title: string
  subTitle: string
  description: string
  language: {
    label: string
    value: string
  }
  level: {
    label: string
    value: string
  }
  category: {
    label: string
    value: string
  }
  introFile: string
  thumbnail: string
  learningObjectives: string[]
  prerequisites: string[]
  courseFor: string[]
  welcomeMessage: string
  congratulationsMessage: string
  price: number
  weekOff: {
    label: string
    value: string
  }[]
  duration: {
    label: string
    value: number
  }
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
  timeSlot: {
    label: string
    value: string
  }
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
