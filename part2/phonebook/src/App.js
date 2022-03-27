import { useState, useEffect } from "react";

import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";

import personService from "./services/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  const handleAddName = (event) => {
    event.preventDefault();
    if (nameExists(newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Replace the old number with the new one?`
        )
      ) {
        const personToUpdate = persons.find((person) => person.name === newName);
        const updatedPerson = { ...personToUpdate, number: newNumber };
        personService
          .update(personToUpdate.id, updatedPerson)
          .then((reponse) =>
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : reponse
              )
            )
          );
      }
      return;
    }
    personService
      .create({
        name: newName,
        number: newNumber,
      })
      .then((person) => setPersons([...persons, person]));
    setNewName("");
    setNewNumber("");
  };

  const nameExists = (name) => {
    return persons.findIndex((person) => person.name === name) !== -1;
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase())
  );

  const handleDelete = (id) => {
    const delPerson = persons.find((person) => person.id === id).name;
    if (window.confirm(`Delete ${delPerson} ? ${id}`)) {
      personService.deletePerson(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterName={filterName}
        handleFilterChange={handleFilterChange}
      ></Filter>
      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleAddName={handleAddName}
      ></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete}></Persons>
    </div>
  );
};

export default App;
