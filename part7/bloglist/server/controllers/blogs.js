const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
  //const blog = new Blog(req.body)
  const body = req.body
  const user = await User.findById(req.user.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  //mongoose-unique-validator downgrade from 3.0.0 to 2.0.3 due to issue with User validator with unique _id
  //https://github.com/FullStack-HY/part3-notes-backend/issues/7
  await user.save()

  const blogToReturn = await Blog.findById(savedBlog._id)
    .populate('user', { username: 1, name: 1 })

  res.status(201).json(blogToReturn)
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body
  const blog = {
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(updatedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {

  const blog = await Blog.findById(req.params.id)
  const user = req.user

  if (blog.user.toString() === user.id) {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } else {
    return res.status(401).json({
      error: 'unauthorized'
    })
  }
})

module.exports = blogsRouter