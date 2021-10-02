import React from 'react'

const Filter = ({ handleFilterChange }) => {
  return (
    <div>
      <span>Find countries: </span><input onChange={handleFilterChange} />
    </div>
  )
}

export default Filter
