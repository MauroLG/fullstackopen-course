import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Error from './components/Error'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationMessage(`Welcome ${user.name}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 2500)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(blogObject)
      console.log(blog)
      setBlogs(blogs.concat(blog))
      setNotificationMessage(`A new blog ${blog.title} by ${blog.author} has been added`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage('An error occurred')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, blog)
      const updatedBlogs = blogs.map(b => b.id === blog.id ? updatedBlog : b)
      setBlogs(updatedBlogs)
    } catch (exception) {
      setErrorMessage('An error has ocurred')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleRemove = async (id) => {
    try {
      await blogService.remove(id)
      const updatedBlogs = blogs.filter(b => b.id !== id)
      setBlogs(updatedBlogs)
    } catch (exception) {
      setErrorMessage('An error has ocurred')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input id="username" type="text" value={username} name="username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input id="password" type="password" value={password} name="password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button id="login" type="submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog}></BlogForm>
    </Togglable>
  )

  const blogList = () => (
    <div>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} likeBlog={handleLike} removeBlog={handleRemove} loggedUser={user} />
      )}
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Error message={errorMessage} />
      <Notification message={notificationMessage} />
      {user === null ? loginForm() :
        <div>
          <p>{user.name} is logged in <button id='logout-button' onClick={handleLogout}>logout</button></p>
          {blogForm()}
          {blogList()}
        </div>
      }
    </div>
  )
}

export default App