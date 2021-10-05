import React from 'react'

const Person = ({ person, handleDelete }) => {

  return (
    <li>{person.name} {person.number} <button onClick={() => handleDelete(person.id, person.name)}>delete</button></li>
  )
}

const Persons = ({ filter, persons, handleDelete }) => {
  return (
    <ul>
      {persons.filter(person => person.name.toLowerCase().includes(filter)).map(person => <Person key={person.id} person={person} handleDelete={handleDelete} />)}
    </ul>
  )
}

export default Persons
