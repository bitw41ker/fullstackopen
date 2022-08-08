const Header = (props) => (
  <div>
    <h1>{props.course}</h1>
  </div>
)

const Part = (props) => (
  <div>
    <p>
      {props.part} {props.exercises}
    </p>
  </div>
)

const Content = ({parts}) => (
  <div>
    {parts.map(part =>
      <Part key={part.id} part={part.name} exercises={part.exercises} />
    )}
  </div>
)

const Total = (props) => (
  <div>
    <p>Number of exercises {
      props.parts[0].exercises
      + props.parts[1].exercises
      + props.parts[2].exercises} </p>
  </div>
)

const Course = ({course}) => (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
  </>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Statemponent',
        exercises: 4,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App