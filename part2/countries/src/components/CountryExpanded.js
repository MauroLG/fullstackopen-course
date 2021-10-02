import React from 'react'
import Weather from './Weather'

const CountryExpanded = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages:</h2>
      <ul>
        {Object.keys(country.languages).map(language => <li key={country.languages[language]}>{country.languages[language]}</li>)}
      </ul>
      <img src={country.flags.png} alt="country flag" />
      <Weather country={country} />
    </div>
  )
}

export default CountryExpanded
