import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '12345'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setNewFilterValue] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    if(persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:
        <input 
          value={filterValue}
          onChange={(event) => setNewFilterValue(event.target.value )}/>
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input 
            value={newName}
            onChange={(event) => setNewName(event.target.value)}/>
        </div>
        <br />
        <div>
          number:
          <input 
            value={newNumber}
            onChange={(event) => setNewNumber(event.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons
          .filter((person) =>
            filterValue === '' || person.name.toLowerCase().includes(filterValue.toLowerCase()))
          .map((person) =>
          <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )

}

export default App