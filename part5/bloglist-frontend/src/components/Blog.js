import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog, loggedUser }) => {

  const [showFullBlog, setShowFullBlog] = useState(false)

  const handleLike = (event) => {
    event.preventDefault()
    likeBlog({ likes: blog.likes++, ...blog })
  }

  const handleRemove = (event) => {
    event.preventDefault()
    window.confirm(`Remove ${blog.title} by ${blog.author}?`) && removeBlog(blog.id)
  }

  const fullBlog = () => (
    <div className='details'>
      <p>{blog.url}</p>
      <p>likes: {blog.likes} <button id="like-button" onClick={handleLike}>like</button></p>
      <p>{blog.user.name}</p>
      {blog.user.username === loggedUser.username && <button id="remove-button" onClick={handleRemove}>remove</button>}
    </div>
  )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className='blog' style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button className="show" onClick={() => { setShowFullBlog(!showFullBlog) }}>{showFullBlog ? 'hide' : 'view'}</button>
      </div>
      {showFullBlog && fullBlog()}
    </div>
  )
}

export default Blog