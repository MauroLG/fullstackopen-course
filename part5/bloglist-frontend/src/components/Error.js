import React from 'react'

const Error = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='error'>
      <h4> {message}</h4>
    </div>
  )
}

export default Error