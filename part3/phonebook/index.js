// IMPORTS
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

// MIDDLEWARES - USES

app.use(express.static('build'))
app.use(express.json())

morgan.token('data', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.data(req, res, 'body')
  ].join(' ')
}))

app.use(cors())


// REQUESTS HANDLERS

// get all

app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {
    res.json(people)
  })
})

// get count of people

app.get('/info', (req, res) => {
  Person.estimatedDocumentCount()
    .then(count => {
      res.send(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`)
    })
})

// get single person

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

// update number of person

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))

})

// delete single person

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

// create new person

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if ((!body.name || !body.number)) {
    return res.status(400).json({
      error: 'You must insert name and number'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
    .catch(error => next(error))

})

// ERROR HANDLER

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({
      error: 'malformatted id'
    })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
