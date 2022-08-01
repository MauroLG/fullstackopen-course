import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import userService from '../services/user'
import { logoutUser } from '../reducers/userReducer'

const Navbar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector(state => state.user)

  const handleLogout = event => {
    event.preventDefault()
    dispatch(logoutUser(null))
    userService.clearUser()
    navigate('/')
  }

  return (
    <div>
      <Link to='/'>Blogs</Link>
      <Link to='/users'>Users</Link>
      <div>{user.name} is logged in <button id='logout-button' onClick={handleLogout}>logout</button></div>
    </div>
  )
}

export default Navbar