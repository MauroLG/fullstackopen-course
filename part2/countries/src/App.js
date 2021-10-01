import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({ countries, filter }) => {
  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter))
  if (filteredCountries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  return (
    < div >
      {
        filteredCountries.map(country => <Country key={country.name} country={country} />)
      }
    </div >
  )
}

const Country = ({ country }) => {
  return (
    <li>{country.name}</li>
  )
}

const Filter = ({ handleFilterChange }) => {
  return (
    <div>
      <input onChange={handleFilterChange} />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} />
      <Countries filter={filter} countries={countries} />
    </div>
  )
}

export default App
