import React from 'react'
import Country from './Country'
import CountryExpanded from './CountryExpanded'

const Countries = ({ countries, filter }) => {

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter))
  if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return (
      <div>
        {
          filteredCountries.map(country => <Country key={country.name.common} country={country} />)
        }
      </div>
    )
  } else if (filteredCountries.length === 1) {
    return (
      <div>
        <CountryExpanded country={filteredCountries[0]} />
      </div>
    )
  }
  return (
    <div><p>Too many matches, specify another filter</p></div>
  )
}

export default Countries
