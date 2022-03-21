import { createSlice } from "@reduxjs/toolkit"

let timeoutID

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      state = action.payload
      return state
    },
    hideNotification(state, action) {
      state = ''
      return state
    }
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const toggleNotification = (content, seconds) => {
  return async dispatch => {
    dispatch(showNotification(content))
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch(hideNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer