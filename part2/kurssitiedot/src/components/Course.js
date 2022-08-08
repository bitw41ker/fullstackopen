const Course = ({course}) => (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
)

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

const Total = ({parts}) => {
  let total = parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );
  
  return (
    <div>
      <p>
        Number of exercises {total}
      </p>
    </div>
  )
}

export default Course;