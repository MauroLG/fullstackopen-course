const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const blog = blogs.reduce((max, cur) => max.likes > cur.likes ? max : cur)
  // to match output format
  return (({ title, author, likes }) => ({ title, author, likes }))(blog)
}

const mostBlogs = (blogsList) => {
  const result = _.countBy(blogsList, 'author')
  const blogs = Math.max(...Object.values(result))
  const author = Object.keys(result).find(key => result[key] === blogs)
  return { author, blogs }
}

const mostLikes = (blogsList) => {
  const result = blogsList.reduce((sum, { author, likes }) => {
    sum[author] = sum[author] || 0
    sum[author] += likes
    return sum
  }, {})
  const likes = Math.max(...Object.values(result))
  const author = Object.keys(result).find(key => result[key] === likes)
  return { author, likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}