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
    <div className='details'>
      <h2>{blog.title}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>likes: {blog.likes} <button id="like-button" onClick={handleLike}>like</button></p>
      <p>added by {blog.user.name}</p>
      {blog.user.username === loggedUser.username && <button id="remove-button" onClick={handleRemove}>remove</button>}
      <div>
        <h3>comments</h3>
        <form onSubmit={addComment}>
          <input id='comment' name='comment' type="text" onChange={handleChangeComment} value={comment.comment} />
          <button type="submit">add comment</button>
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