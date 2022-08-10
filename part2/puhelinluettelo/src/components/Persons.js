import Person from './Person'

const Persons = ({persons, filterValue}) => {
  return (
    persons
      .filter((person) =>
        filterValue === '' || person.name.toLowerCase().includes(filterValue.toLowerCase()))
      .map((person) =>
      <Person
        key={person.name}
        name={person.name}
        number={person.number}
      />)
  )
}

export default Persons;