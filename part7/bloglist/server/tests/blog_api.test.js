const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  /*   const blogsObject = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogsObject.map(blog => blog.save())
    await Promise.all(promiseArray) */
  await Blog.insertMany(helper.initialBlogs)
}, 100000)

describe('when there is initially some blogs saved', () => {
  test('the correct amount of blogs are returned as json', async () => {

    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)

  })

  test('identifier property (id) of the blog exists', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('addition of a new blog', () => {

  test('a blog is successfully created', async () => {
    const newBlog = {
      title: 'Best course of web development',
      author: 'Laniakea',
      url: 'http://fullstackopen.com/',
      likes: 100
    }

    await api.post('/api/blogs')
      .set('Authorization', "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicm9vdCIsIm5hbWUiOiJSb290IEd1eSIsImlkIjoiNjFiZDFhZTBiNWFkY2IxNjRjOGQ2NDhlIn0.__u13LgUXTwm9dcsHlIZTtp0IwkXy8-CrEnObVmS7tw")
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).toContainEqual('Best course of web development')

  })

  test('if a token is not provided, backend responds with status code 401 Unauthorized', async () => {
    const newBlog = {
      title: 'Best course of web development',
      author: 'Laniakea',
      url: 'http://fullstackopen.com/',
      likes: 100
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })

  test('if likes property is missing, it will default to the value 0', async () => {
    const newBlog = {
      title: 'Best course of web development',
      author: 'Laniakea',
      url: 'http://fullstackopen.com/'
    }

    const response = await api.post('/api/blogs')
      .set('Authorization', "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicm9vdCIsIm5hbWUiOiJSb290IEd1eSIsImlkIjoiNjFiZDFhZTBiNWFkY2IxNjRjOGQ2NDhlIn0.__u13LgUXTwm9dcsHlIZTtp0IwkXy8-CrEnObVmS7tw")
      .send(newBlog)

    expect(response.body.likes).toBe(0)

  })

  test('if title and url properties are missing, backend responds with status code 400 Bad Request', async () => {
    const newBlog = {
      author: 'Laniakea',
      likes: 5
    }

    await api.post('/api/blogs')
      .set('Authorization', "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicm9vdCIsIm5hbWUiOiJSb290IEd1eSIsImlkIjoiNjFiZDFhZTBiNWFkY2IxNjRjOGQ2NDhlIn0.__u13LgUXTwm9dcsHlIZTtp0IwkXy8-CrEnObVmS7tw")
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid and check if it was not created', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicm9vdCIsIm5hbWUiOiJSb290IEd1eSIsImlkIjoiNjFiZDFhZTBiNWFkY2IxNjRjOGQ2NDhlIn0.__u13LgUXTwm9dcsHlIZTtp0IwkXy8-CrEnObVmS7tw")
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const title = blogsAtEnd.map(blog => blog.title)

    expect(title).not.toContain(blogToDelete.title)

  })
})

describe('update of a blog', () => {
  test('amount of likes in a blog is successfully updated', async () => {

    const updateLikesBlog = {
      likes: 15
    }

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api.put(`/api/blogs/${blogToUpdate.id}`)
      .send(updateLikesBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]

    expect(updateLikesBlog.likes).toBe(updatedBlog.likes)

  })
})

afterAll(() => {
  mongoose.connection.close()
})