import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      }).catch(error => {
        console.log("The following error has occurred: ", error)
      }
      )
  }, [])

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

      personsService
        .create(newPersonObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        }).catch(error => {
          console.log("The following error has occurred: ", error)
        }
        )
    }
    else {
      const auxPerson = persons.find(person => person.name === newPersonObj.name)
      if (window.confirm(`${auxPerson.name} is already added to phonebook, replace the old number with a new one?`))
        personsService
          .update(auxPerson.id, { ...auxPerson, number: newPersonObj.number })
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== auxPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          }).catch(error => {
            console.log("The following error has occurred: ", error)
          }
          )
    }
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .remove(id)
        .then(response => {
          if (response.status === 200) {
            personsService
              .getAll()
              .then(initialPersons => {
                setPersons(initialPersons)
              }).catch(error => {
                console.log("The following error has occurred: ", error)
              }
              )
          }
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} valueName={newName} valueNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} handleDelete={handleDelete} />
    </div >
  )
}

export default App