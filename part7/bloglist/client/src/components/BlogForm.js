import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const BlogForm = ({ createBlog }) => {

  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const dispatch = useDispatch()

  const addBlog = event => {
    event.preventDefault()
    dispatch(createBlog(newBlog))
    setNewBlog({ title: '', author: '', url: '' })
  }

  const handleBlogChange = (event) => {
    setNewBlog({
      ...newBlog,
      [event.target.name]: event.target.value
    })
  }

  return (
    <div className='formDiv mt-4'>
      <h3>Create new blog</h3>
      <form className='mt-3 mb-3' onSubmit={addBlog}>
        <div className='mb-3'>
          <label htmlFor='title' className='form-label'>Title</label>
          <input id='title' className='form-control' type="text" name="title" value={newBlog.title} onChange={handleBlogChange} />
        </div>
        <div className='mb-3'>
          <label htmlFor='author' className='form-label'>Author</label>
          <input id='author' className='form-control' type="text" name="author" value={newBlog.author} onChange={handleBlogChange} />
        </div>
        <div className='mb-3'>
          <label htmlFor='url' className='form-label'>URL</label>
          <input id='url' className='form-control' type="text" name="url" value={newBlog.url} onChange={handleBlogChange} />
        </div>
        <button id='addblog' className='btn btn-primary' type="submit">Add blog</button>
      </form>
    </div>
  )
}

export default BlogForm
