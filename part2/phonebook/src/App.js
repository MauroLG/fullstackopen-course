import React, { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPersonObj = {
      name: newName,
      number: newNumber,
    }
    if (!persons.some(person => person.name === newPersonObj.name)) {
      setPersons(persons.concat(newPersonObj))
    } else {
      alert(`${newPersonObj.name} is already added to phonebook`)
    }
    setNewName('')
    setNewNumber('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} valueName={newName} valueNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} />
    </div >
  )
}

export default App