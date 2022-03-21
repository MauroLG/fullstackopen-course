import React from 'react'
import { connect } from 'react-redux'
import { filterAnecdote } from '../reducers/filterReducer'

const Filter = (props) => {

  const handleChange = (event) => {
    props.filterAnecdote(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filterAnecdote,
}


const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter