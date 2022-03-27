import Person from "./Person";

const Persons = ({ persons, handleDelete }) => {
  return (
    <>
      {persons.map((person) => (
        <Person key={person.name} person={person} handleDelete={handleDelete}></Person>
      ))}
    </>
  );
};

export default Persons;
