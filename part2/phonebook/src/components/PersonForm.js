import React from 'react'

const PersonForm = ({ handleSubmit, handleNameChange, handleNumberChange, valueName, valueNumber }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Name: <input onChange={handleNameChange} value={valueName} />
      </div>
      <div>
        Number: <input onChange={handleNumberChange} value={valueNumber} />
      </div>
      <div>
        <button type="submit">ADD</button>
      </div>
    </form >
  )
}

export default PersonForm
