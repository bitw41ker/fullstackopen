import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setNewFilterValue] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(personsData => {
        setPersons(personsData);
      });
  }, []);

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

    setNewName('');
    setNewNumber('');
    
    personService
      .create(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson));
      })
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
  );

}

export default App;