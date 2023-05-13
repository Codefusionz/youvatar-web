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
