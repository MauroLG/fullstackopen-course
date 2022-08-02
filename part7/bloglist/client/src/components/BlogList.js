import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {

  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div className='mt-3'>
      <h3>Blog list</h3>
      <ul className='list-group list-group-flush'>
        {sortedBlogs.map(blog =>
          <li className='list-group-item' key={blog.id}>
            <Link className='text-reset' to={`blogs/${blog.id}`}>
              <div className='blog'>{blog.title}</div></Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default BlogList