import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { toggleNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filterSearch = useSelector(state => state.filter)

  const vote = async ({ id, content, votes }) => {
    dispatch(voteAnecdote(id, content, votes))
    dispatch(toggleNotification(`You voted "${content}" anecdote!`, 5))
  }

  return (
    <div>
      {[...anecdotes].sort((a, b) => b.votes - a.votes).filter(a => a.content.toLowerCase().includes(filterSearch.toLowerCase())).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}</div>
  )
}

export default AnecdoteList