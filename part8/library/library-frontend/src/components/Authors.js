import { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'


const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const result = useQuery(ALL_AUTHORS)
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const submitUpdateAuthor = async (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name, born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token &&
        <div>
          <h2>Set birthyear</h2>
          <form onSubmit={submitUpdateAuthor}>
            <div>
              name
              <select name="author" id="author" defaultValue={'default'} onChange={({ target }) => setName(target.value)}>
                <option value={'default'} disabled>choose an author</option>
                {authors.map(a => <option key={a.name} value={a.name}>{a.name}</option>)}
              </select>
            </div>
            <div>
              born
              <input type="number" value={born} onChange={({ target }) => setBorn(target.valueAsNumber)} />
            </div>
            <button type="submit">update author</button>
          </form>
        </div>
      }
    </div>
  )
}

export default Authors