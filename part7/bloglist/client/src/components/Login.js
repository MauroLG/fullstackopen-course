import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import userService from '../services/user'
import { loginUser } from '../reducers/userReducer'
import { createNotification } from '../reducers/notificationReducer'


const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()


  const handleLogin = async event => {
    event.preventDefault()

    try {
      const userLogin = await loginService.login({
        username, password,
      })
      setUsername('')
      setPassword('')
      dispatch(loginUser(userLogin))
      userService.setUser(userLogin)
      dispatch(createNotification({ message: `Welcome ${userLogin.name}!`, type: 'success' }, 2))
    } catch (exception) {
      dispatch(createNotification({ message: 'Wrong credentials. Try again', type: 'alert' }, 5))
    }
  }

  return (
    <div className='col-md-6 offset-md-3 '>
      <form className='card-body cardbody-color p-lg-5' onSubmit={handleLogin}>
        <h2 className='text-center'>Log in to Blog Post application</h2>
        <div className='mt-5 mb-3'>
          <label htmlFor="username" className='form-label'>Username</label>
          <input id="username" className='form-control' type="text" value={username} name="username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div className='mb-4'>
          <label htmlFor="password" className='form-label'>Password</label>
          <input id="password" className='form-control' type="password" value={password} name="password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button id="login" className='btn btn-dark px-5 mb-4 w-100 text-uppercase' type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login