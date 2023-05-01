import React, { useState, useRef } from 'react'

function ResizableTextArea({
  placeholder = 'Type your message...',
  value = '',
  onChange = (event) => {
    console.log('pass onChange function')
  },
  onSubmit = () => {
    console.log('pass onSubmit function to submit')
  },
}) {
  const textareaRef = useRef(null)

  const handleChange = (event) => {
    onChange(event)
    const numberOfLines = event.target.value.split('\n').length
    textareaRef.current.rows = numberOfLines > 5 ? 5 : numberOfLines
  }

  const onPressingEnter = (e) => {
    if (value.trim() !== '' && e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault()
      onSubmit()
      handleChange({ target: { value: '' } })
    }
  }

  return (
    <textarea
      ref={textareaRef}
      rows={1}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      style={{ resize: 'none' }}
      className="scrollbar-thin focus:outline-none py-1 px-2 w-full"
      onKeyDown={(e) => onPressingEnter(e)}
    />
  )
}

export default ResizableTextArea
