import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import { createNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlog(state, action) {
      const updatedBlog = action.payload

      return state.map(b => b.id === updatedBlog.id ? updatedBlog : b)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(b => b.id !== id)
    }
  }
})

export const { setBlogs, appendBlog, setBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    try {
      const createdBlog = await blogService.create(newBlog)
      dispatch(appendBlog(createdBlog))
      dispatch(createNotification({ message: `A new blog ${createdBlog.title} by ${createdBlog.author} has been added`, type: 'success' }, 2))
    } catch (exception) {
      dispatch(createNotification({ message: 'An error has occurred', type: 'alert' }, 5))
    }
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, blog)
    dispatch(setBlog(updatedBlog))
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    try {
      await blogService.remove(id)
      dispatch(removeBlog(id))
    } catch (exception) {
      dispatch(createNotification({ message: 'An error has ocurred', type: 'alert' }, 5))
    }
  }
}

export default blogSlice.reducer