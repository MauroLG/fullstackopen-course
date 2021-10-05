import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      }).catch(error => {
        setErrorMessage("The connection to the server has been lost")
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
          setNotificationMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        }).catch(error => {
          setErrorMessage("The connection to the server has been lost")
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
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
            setNotificationMessage(`${returnedPerson.name} phone number has been modified`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          }).catch(error => {
            setErrorMessage("The connection to the server has been lost")
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
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
          console.log(response)
          if (response.status === 200) {
            setNotificationMessage(`Deleted ${name}`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            personsService
              .getAll()
              .then(initialPersons => {
                setPersons(initialPersons)
              }).catch(error => {
                console.log("The following error has occurred: ", error)
              }
              )
          }
        }).catch(error => {
          setErrorMessage(`Information of ${name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          console.log("The following error has occurred: ", error)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <Filter handleChange={handleFilterChange} />
      <h2>Add a new </h2>
      <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} valueName={newName} valueNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} handleDelete={handleDelete} />
    </div >
  )
}

export default App