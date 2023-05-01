import axios from 'axios'
import moment from 'moment'

function sortLecturesByTime(lectures) {
  const sortedLectures = lectures.sort((a, b) => {
    const timeA = moment(a.time, 'h:mm A')
    const timeB = moment(b.time, 'h:mm A')
    return timeB.diff(timeA)
  })

  return sortedLectures
}

export const fetchUpcomingLiveClasses = async () => {
  try {
    const response = await axios.get('/api/mentor/classes')
    return sortLecturesByTime(response.data.data)
  } catch (error) {
    console.log(error)
  }
  return []
}

export const fetchDraftCourses = async () => {
  try {
    const response = await axios.get('/api/course/draft')
    return response.data.data
  } catch (error) {
    console.log(error)
  }
  return []
}

export const fetchCourses = async () => {
  try {
    const response = await axios.get('/api/course')
    return response.data.data
  } catch (error) {
    console.log(error)
  }
  return []
}
