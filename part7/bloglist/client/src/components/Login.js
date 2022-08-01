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
      dispatch(createNotification({ message: `Welcome ${userLogin.name}`, type: 'success' }, 2))
    } catch (exception) {
      dispatch(createNotification({ message: 'Wrong credentials', type: 'alert' }, 5))
    }
  }

  return (
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
}

export default Login