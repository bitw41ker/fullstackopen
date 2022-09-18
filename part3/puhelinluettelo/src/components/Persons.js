import Person from './Person';

const Persons = ({persons, filterValue, handleDelete}) => {
  return (
    persons
      .filter((person) =>
        filterValue === '' || person.name.toLowerCase().includes(filterValue.toLowerCase()))
      .map((person) => 
        <div 
          key={person.name}
          id={person.name}
        >
          <Person
            name={person.name}
            number={person.number}
          />
          <button
            id={person.id}
            onClick={handleDelete}
          >
            Delete
          </button>


        </div>)
  );
}

export default Persons;