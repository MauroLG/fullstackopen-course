import React, { useEffect, useRef } from 'react'
import Notification from './components/Notification'
import userService from './services/user'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { loginUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import {
  Routes,
  Route,
  useMatch
} from 'react-router-dom'
import Login from './components/Login'
import Users from './components/Users'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import User from './components/User'
import Navbar from './components/Navbar'

const App = () => {

  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const userMatch = useMatch('/users/:id')
  const matchedUser = userMatch ? users.find(user => user.id === userMatch.params.id) : null

  const blogMatch = useMatch('/blogs/:id')
  const matchedBlog = blogMatch ? blogs.find(user => user.id === blogMatch.params.id) : null

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const userFromStorage = userService.getUser()
    if (userFromStorage) {
      dispatch(loginUser((userFromStorage)))
    }
  }, [dispatch])

  if (user === null) {
    return (
      <>
        <Notification notification={notification} />
        <Login />
      </>

    )
  }

  return (
    <div>
      <h1>Blog App</h1>
      <Notification notification={notification} />
      <Navbar></Navbar>

      <Routes>
        <Route path='/' element={<><Togglable buttonLabel='create new blog' ref={blogFormRef}><BlogForm createBlog={createBlog}></BlogForm>
        </Togglable><BlogList /></>}></Route>
        <Route path='/users' element={<Users users={users} />}></Route>
        <Route path='/users/:id' element={<User user={matchedUser} />}></Route>
        <Route path='/blogs/:id' element={<Blog blog={matchedBlog} loggedUser={user} />}></Route>
      </Routes>
    </div>
  )
}

export default App