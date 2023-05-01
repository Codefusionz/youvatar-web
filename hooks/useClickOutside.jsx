import { useEffect, useRef } from 'react'

const useClickOutside = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback()
    }
  }

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      callback()
    }
  }

  const handleClickOrEscape = (e) => {
    handleClick(e)
    handleEscapeKey(e)
  }

  const refCallback = useRef()

  useEffect(() => {
    refCallback.current = handleClickOrEscape
  })

  useEffect(() => {
    const handleClickOrEscape = (e) => {
      handleClick(e)
      handleEscapeKey(e)
    }

    document.addEventListener('mousedown', handleClickOrEscape)
    document.addEventListener('keydown', handleClickOrEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOrEscape)
      document.removeEventListener('keydown', handleClickOrEscape)
    }
  }, [])
}

export default useClickOutside
