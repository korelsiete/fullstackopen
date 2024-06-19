import { useEffect, useState } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const verifyName = (name) => {
    return persons.some(
      (person) => person.name.toLowerCase() === name.toLowerCase()
    );
  };

  const cleanNumber = (number) => {
    return number
      .replace(/[^\d+]/g, " ")
      .split(/\s+/)
      .join(" ")
      .trim();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanedName = newName.trim();
    const cleanedNumber = cleanNumber(newNumber);

    if (cleanedName === "") return;

    if (cleanedNumber.length < 7) {
      alert("Phone number must be at least 7 digits long");
      return;
    }

    if (verifyName(cleanedName)) {
      const confirmUpdate = confirm(
        `${cleanedName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmUpdate) {
        const person = persons.find((person) => person.name === cleanedName);
        const updatedPerson = { ...person, number: cleanedNumber };
        personService
          .update(person.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
            setNewName("");
            setNewNumber("");
          });
      }

      return;
    }

    const newPerson = { name: cleanedName, number: cleanedNumber };

    personService.create(newPerson).then((createdPerson) => {
      setPersons(persons.concat(createdPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleDeletePerson = (id) => {
    const { name } = persons.find((person) => person.id === id);
    const confirmDelete = confirm(`Delete ${name}?`);

    if (confirmDelete) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChangeFilter={handleChangeFilter} />

      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        newName={newName}
        newNumber={newNumber}
      />

      <h3>Numbers</h3>
      <Persons
        filteredPersons={filteredPersons}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};
export default App;
