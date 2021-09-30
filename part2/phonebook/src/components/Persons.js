import React from 'react'

const Person = ({ person }) => <li key={person.name}>{person.name} {person.number}</li>

const Persons = ({ filter, persons }) => {
  return (
    <ul>
      {persons.filter(person => person.name.toLowerCase().includes(filter)).map(person => <Person person={person} />)}
    </ul>
  )
}

export default Persons
