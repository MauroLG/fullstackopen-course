import React from 'react'

const Person = ({ person }) => <li>{person.name} {person.number}</li>

const Persons = ({ filter, persons }) => {
  return (
    <ul>
      {persons.filter(person => person.name.toLowerCase().includes(filter)).map(person => <Person key={person.name} person={person} />)}
    </ul>
  )
}

export default Persons
