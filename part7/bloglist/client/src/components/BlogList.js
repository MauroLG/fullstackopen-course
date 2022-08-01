import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {

  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <>
      <ul>
        {sortedBlogs.map(blog =>
          <li key={blog.id}>
            <Link to={`blogs/${blog.id}`}>
              <div className='blog' style={blogStyle}>{blog.title}</div></Link>
          </li>
        )}
      </ul>
    </>
  )
}

export default BlogList