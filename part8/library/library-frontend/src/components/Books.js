import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState('')
  const result = useQuery(ALL_BOOKS,
    {
      fetchPolicy: 'cache-and-network',
      variables: { genre: genreFilter }
    }
  )


  let resultGenres = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  resultGenres = resultGenres.data.allBooks

  /*   const genres = [...new Set(books.map(book => book.genres).flat(1))] */
  const genres = [...new Set(resultGenres.flatMap(book => book.genres))]

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => <button key={genre} onClick={({ target }) => setGenreFilter(target.innerHTML)}>{genre}</button>)}
      <button key='allgenres' onClick={() => setGenreFilter('')}>all genres</button>
    </div>
  )
}

export default Books