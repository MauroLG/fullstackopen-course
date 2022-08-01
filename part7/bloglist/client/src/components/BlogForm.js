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
    <div className='formDiv'><h1>create new blog</h1>
      <form onSubmit={addBlog}>
        <p>title:<input id='title' type="text" name="title" value={newBlog.title} onChange={handleBlogChange} /></p>
        <p>author:<input id='author' type="text" name="author" value={newBlog.author} onChange={handleBlogChange} /></p>
        <p>url:<input id='url' type="text" name="url" value={newBlog.url} onChange={handleBlogChange} /></p>
        <button id='addblog' type="submit">add</button>
      </form>
    </div>
  )
}

export default BlogForm
