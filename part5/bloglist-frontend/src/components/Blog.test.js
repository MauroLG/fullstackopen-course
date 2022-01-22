import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('renders title and author of a blog', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Me'
  }

  const component = render(
    <Blog blog={blog} />
  )

  const div = component.container.querySelector('.blog')

  console.log(prettyDOM(div))

  expect(component.container).toHaveTextContent('Component testing is done with react-testing-library')
  expect(component.container).toHaveTextContent('Me')
})

test('blog url and likes are shown when button show has been clicked', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Me',
    user: { username: 'johndoe', name: 'John Doe' },
    url: 'https://testingurlblog.com',
    likes: 4
  }

  const loggedUser = {
    username: 'johndoe'
  }

  //const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} loggedUser={loggedUser} />
  )

  const button = component.container.querySelector('.show')
  userEvent.click(button)
  const div = component.container.querySelector('.blog')

  console.log(prettyDOM(div))


  expect(
    component.container.querySelector('.details')
  ).not.toBe(null)

})

test('if the like button is clicked twice, the handler is called twice', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Me',
    user: { username: 'johndoe', name: 'John Doe' },
    url: 'https://testingurlblog.com',
    likes: 4
  }

  const loggedUser = {
    username: 'johndoe'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} loggedUser={loggedUser} likeBlog={mockHandler} />
  )

  const buttonShow = component.container.querySelector('.show')
  userEvent.click(buttonShow)
  const buttonLike = component.getByText('like')
  fireEvent.click(buttonLike)
  fireEvent.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)

})

test('create a new blog correctly', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('.formDiv form')

  fireEvent.change(title, {
    target: { value: 'Component testing is done with react-testing-library' }
  })
  fireEvent.change(author, {
    target: { value: 'Me' }
  })
  fireEvent.change(url, {
    target: { value: 'https://testingurlblog.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Component testing is done with react-testing-library')
  expect(createBlog.mock.calls[0][0].author).toBe('Me')
  expect(createBlog.mock.calls[0][0].url).toBe('https://testingurlblog.com')

})