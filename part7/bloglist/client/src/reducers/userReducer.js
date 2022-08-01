import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setLoggedUser(state, action) {
      return action.payload
    }
  }
})

export const { setLoggedUser } = userSlice.actions

export const loginUser = (user) => {
  return dispatch => {
    dispatch(setLoggedUser(user))
  }
}

export const logoutUser = () => {
  return dispatch => {
    dispatch(setLoggedUser(null))
  }
}

export default userSlice.reducer