import axios from 'axios'

export const getSingedUrl = async (key) => {
  try {
    const response = await axios.get(`/api/files/upload?key=${key}`)
    return response.data?.uploadUrl
  } catch (error) {
    console.log(error)
  }
}

export const createProfileImage = (name) => {
  const firstLetter = name.charAt(0).toUpperCase()
  const canvas = document.createElement('canvas')
  canvas.width = 200
  canvas.height = 200
  const context = canvas.getContext('2d')
  context.fillStyle = '#3949ab'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.font = '75px Arial'
  context.fillStyle = '#fff'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(firstLetter, canvas.width / 2, canvas.height / 2)
  return canvas.toDataURL()
}

export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K'
  } else {
    return num.toString()
  }
}

export const getTimeElapsedString = (timeString) => {
  const now = new Date()
  const time = new Date(timeString)
  const elapsed = (now - time) / 1000

  const minute = 60
  const hour = 60 * minute
  const day = 24 * hour

  if (elapsed < minute) {
    return Math.round(elapsed / 1000) + 's'
  } else if (elapsed < hour) {
    return Math.round(elapsed / minute) + 'm'
  } else if (elapsed < day) {
    return Math.round(elapsed / hour) + 'h'
  } else {
    return Math.round(elapsed / day) + 'd'
  }
}
