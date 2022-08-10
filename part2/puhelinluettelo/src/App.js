import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
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
      <Filter
        value={filterValue}
        handleValue={(event) => setNewFilterValue(event.target.value)}
      />

      <h2>Add a new</h2>

      <PersonForm 
        onSubmit={addPerson}
        onNameChange={(event) => setNewName(event.target.value)}
        onNumberChange={(event) => setNewNumber(event.target.value)}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>

      <Persons persons={persons} filterValue={filterValue}/>
    </div>
  )

}

export default App