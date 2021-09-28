import React from 'react'

const Header = ({ course }) => <h1>{course.name}</h1>

const Content = ({ course }) => {
  return (
    <>
      <Part part={course.parts[0]} />
      <Part part={course.parts[1]} />
      <Part part={course.parts[2]} />
    </>
  )
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

/* const Total = ({ course }) => <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p> */

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      {/* <Total course={course} /> */}
    </div>
  )
}

export default Course
