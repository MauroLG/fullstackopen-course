import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      }
  }
`
export const ALL_BOOKS = gql`
  query ($genre: String){
    allBooks(genre: $genre){
      title
      author {
        name
      }
      genres
      published
    }
  }
`

export const ME = gql`
query {
  me {
    username
    favouriteGenre
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password){
      value
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String! $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      genres
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $born: Int!) {
    editAuthor(
      name: $name
      setBornTo: $born
    ) {
      name
      born
    }
  }
`
export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    title
    published
    author {
      name
    }
    genres
  }
}
`