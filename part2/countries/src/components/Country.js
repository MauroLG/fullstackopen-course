import React, { useState } from 'react'
import CountryExpanded from './CountryExpanded'
import axios from 'axios'

const Country = ({ country }) => {
  const [showExpanded, setShowExpanded] = useState(false)

  if (showExpanded) {
    return (
      <div>
        <CountryExpanded country={country} /><button onClick={() => { setShowExpanded(!showExpanded) }}>show less</button>
      </div>
    )
  }
  return (
    <p>{country.name.common} <button onClick={() => { setShowExpanded(!showExpanded) }}>show details</button></p>
  )
}

export default Country
