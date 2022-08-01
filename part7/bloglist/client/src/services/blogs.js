import axios from 'axios'
import userService from './user'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: `bearer ${userService.getToken()}` },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment)
  return response.data
}

const update = async (id, newObject) => {
  const object = { ...newObject, likes: newObject.likes + 1 }
  const response = await axios.put(`${baseUrl}/${id}`, object)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: `bearer ${userService.getToken()}` },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const exportedObject = {
  getAll,
  create,
  addComment,
  update,
  remove
}

export default exportedObject