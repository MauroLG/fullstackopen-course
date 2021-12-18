const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const bcrypt = require('bcrypt')
const api = supertest(app)

const User = require('../models/user')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('secretpassword', 10)
    const user = new User({ username: 'root', passwordHash, name: 'Root Guy' })
    await user.save()
  }, 100000)

  test('a user is succesfully created with a new username', async () => {

    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "imjohndoe",
      password: "lolazo123",
      name: "John Doe"
    }

    await api.post('/api/users').send(newUser).expect(200).expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper status code and message if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'anotherpassword'
    }

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper status code and message if username is not given', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'John Doe',
      password: 'somepassword'
    }

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper status code and message if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "ro",
      name: 'John Doe',
      password: 'somepassword'
    }

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('is shorter than the minimum allowed length')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper status code and message if password is not given', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'anewuser',
      name: 'John Doe',
    }

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password not long enough')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

})

describe('when there are a few users in db', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash_user1 = await bcrypt.hash('secretpassword', 10)
    const passwordHash_user2 = await bcrypt.hash('anothersecretpass', 10)
    const user1 = new User({ username: 'root', passwordHash_user1, name: 'Root Guy' })
    const user2 = new User({ username: 'blogger', passwordHash_user2, name: 'Blogger Guy' })
    await user1.save()
    await user2.save()
  }, 100000)

  test('the correct amount of users is returned as json', async () => {

    const response = await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength((await helper.usersInDb()).length)

  })
})

afterAll(() => {
  mongoose.connection.close()
})