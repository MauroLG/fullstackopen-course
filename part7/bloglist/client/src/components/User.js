import React from 'react'

const User = ({ user }) => {

  if (!user) {
    return null
  }

  return (
    <div className='mt-3'>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User