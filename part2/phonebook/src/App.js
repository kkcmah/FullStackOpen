import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleAddName = (event) => {
    event.preventDefault();
    if (nameExists(newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons([...persons, { name: newName }]);
    setNewName("");
  };

  const nameExists = (name) => {
    return persons.findIndex((person) => person.name === name) !== -1;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit" onClick={handleAddName}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>{person.name}</div>
      ))}
    </div>
  );
};

export default App;
