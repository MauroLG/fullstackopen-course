import { useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { ALL_BOOKS, ME } from '../queries'

const Recommended = (props) => {
  const meResult = useQuery(ME)
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'no-cache'
  })

  const [me, setMe] = useState(null)
  const [meBooks, setMeBooks] = useState([])

  useEffect(() => {
    if (meResult.data && meResult.data.me) {
      setMe(meResult.data.me)

      getBooks({ variables: { genre: meResult.data.me.favouriteGenre } })
    }
  }, [meResult, me, getBooks])

  useEffect(() => {
    if (booksResult.data) {
      setMeBooks(booksResult.data.allBooks)
    }
  }, [booksResult])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>Recommended</h2>
      <p>books in your favourite genre: <b> {meResult.data.me.favouriteGenre} </b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {meBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended