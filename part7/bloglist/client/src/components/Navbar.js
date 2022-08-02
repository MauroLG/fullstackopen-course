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
    <nav className='navbar navbar-expand-lg' style={{ backgroundColor: '#ebf2fa' }}>
      <div className='container-fluid'>
        <div className='navbar-collapse' id='navbarMenu'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'><Link className='nav-link text-uppercase' to='/'>Blogs</Link></li>
            <li className='nav-item'><Link className='nav-link text-uppercase' to='/users'>Users</Link></li>
          </ul>
        </div>
        <div>{user.name} is logged in <button className='btn btn-secondary btn-sm text-uppercase' id='logout-button' onClick={handleLogout}>Logout</button></div>
      </div>
    </nav>
  )
}

export default Navbar