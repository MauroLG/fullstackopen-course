import React, { useState } from 'react'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'

const Blog = ({ blog, loggedUser }) => {

  const [comment, setComment] = useState({ comment: '' })
  const dispatch = useDispatch()


  const handleLike = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }
  const handleRemove = (event) => {
    event.preventDefault()
    window.confirm(`Remove ${blog.title} by ${blog.author}?`) && dispatch(deleteBlog(blog.id))
  }

  const handleChangeComment = (event) => {
    setComment({ comment: event.target.value })
  }

  const addComment = async (event) => {
    event.preventDefault()
    try {
      await blogService.addComment(blog.id, comment)
      setComment({ comment: '' })
      dispatch(createNotification({ message: 'Comment was added to blog post!', type: 'success' }, 3))
    } catch (exception) {
      console.log('An error has ocurred')
    }

  }

  if (!blog) {
    return null
  }

  return (
    <div className='container-fluid mt-4'>
      <div className='container-fluid mb-4'>
        <h3>{blog.title}</h3>
        <p><a href={blog.url}>{blog.url}</a></p>
        <p>Likes: {blog.likes} <button id="like-button" className='btn btn-dark btn-sm' onClick={handleLike}>Like</button></p>
        <p>added by {blog.user.name}</p>
        {blog.user.username === loggedUser.username && <button id="remove-button" className='btn btn-danger btn-sm' onClick={handleRemove}>Remove</button>}
      </div>
      <div>
        <h3>Comments</h3>
        <form className='mb-3 input-group w-50' onSubmit={addComment}>
          <input id='comment' className='form-control' name='comment' type="text" onChange={handleChangeComment} value={comment.comment} />
          <div className='input-group-append'>
            <button className='btn btn-dark ms-2' type="submit">Add comment</button>
          </div>
        </form>
        <ul>
          {
            blog.comments.map(comment =>
              <li key={blog.comments.indexOf(comment) + 1}>
                {comment}
              </li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default Blog