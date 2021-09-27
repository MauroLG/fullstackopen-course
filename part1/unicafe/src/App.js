import React, { useState } from 'react';


const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Statistics = (props) => {

  const { good, neutral, bad, all } = props.value

  if (all === 0) return <div><p>No feedback given</p></div>

  return (
    <table>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={all} />
      <StatisticLine text='average' value={(good - bad) / all} />
      <StatisticLine text='positive' value={(good / all) * 100 + ' %'} />
    </table>
  )
}

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const App = () => {

  const [feedback, setFeedack] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
  })

  const handleClickGood = () => {
    setFeedack({
      ...feedback,
      good: feedback.good + 1,
      all: feedback.all + 1,
    })
  }
  const handleClickNeutral = () => {
    setFeedack({
      ...feedback,
      neutral: feedback.neutral + 1,
      all: feedback.all + 1,
    })
  }
  const handleClickBad = () => {
    setFeedack({
      ...feedback,
      bad: feedback.bad + 1,
      all: feedback.all + 1,
    })
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleClickGood} text='good' />
      <Button handleClick={handleClickNeutral} text='neutral' />
      <Button handleClick={handleClickBad} text='bad' />
      <h2>statistics</h2>
      <Statistics value={feedback} />
    </div >
  )

}

export default App;
