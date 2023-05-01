import { useEffect, useRef } from 'react'

import Portal from './Portal'

const Modal = ({ onClose = () => {}, children }) => {
  const modalWrapperRef = useRef(null)

  useEffect(() => {
    const backDropHandler = (e) => {
      if (!modalWrapperRef?.current?.contains(e.target)) {
        onClose()
      }
    }

    document.addEventListener('click', backDropHandler)

    return () => document.removeEventListener('click', backDropHandler)
  }, [onClose])

  const modalContent = (
    <div className="fixed inset-0 z-100 h-full w-full bg-black/50 lg:flex lg:items-center lg:justify-center overflow-y-scroll scrollbar-thin">
      <div className="rounded-md" ref={modalWrapperRef}>
        {children}
      </div>
    </div>
  )

  return <Portal>{modalContent}</Portal>
}

export default Modal
