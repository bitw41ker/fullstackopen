import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterValue, setNewFilterValue] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(personsData => {
        setPersons(personsData);
      });
  }, []);

  const notify = (message) => {
    setNotificationMessage(message);
    setTimeout(() => setNotificationMessage(null), 3000);
  }
  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const foundPerson = persons.find(person => person.name === newName);

    if(!foundPerson) {
      personService
        .create(newPerson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson));
        });

      notify(`Added ${newName}`);
    } else {
      const replaceNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`);

      if(!replaceNumber)
        return;
      
      newPerson.id = foundPerson.id;

      personService
        .update(newPerson)
        .then(updatedPerson => {
          console.log(updatedPerson);
          setPersons(
            persons
              .filter(person => person.name !== newName)
              .concat(updatedPerson)
          );
        });
      
      notify(`Changed phone number for ${newName} to ${newNumber}`);
    }
    
    setNewName('');
    setNewNumber('');

    
  }

  const deletePerson = (event) => {
    if(!window.confirm(`Delete ${event.target.parentElement.id}?`)) return;

    personService
      .remove(event.target.id)
      .then(() => {
        setPersons(persons.filter(person => {
          return person.id != event.target.id;
        }));
      });
    
      notify(`Deleted ${event.target.parentElement.id}`);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
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

      <Persons
        persons={persons}
        filterValue={filterValue}
        handleDelete={deletePerson}
      />
    </div>
  );

}

export default App;