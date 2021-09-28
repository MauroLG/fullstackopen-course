import React from 'react'

const Header = ({ course }) => <h2>{course.name}</h2>

const Content = ({ course }) => course.parts.map((part) => <Part key={part.id} part={part} />)


const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ course }) => {

  const total = course.parts.reduce((acc, cur) => acc + cur.exercises, 0);

  return (
    <p><b>total of {total} exercises</b></p>
  )

}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <div><Content course={course} /></div>
      <Total course={course} />
    </div>
  )
}

export default Course
