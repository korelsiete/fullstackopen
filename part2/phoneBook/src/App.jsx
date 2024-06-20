import { useEffect, useState } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({ state: null, text: null });

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .catch(() => {
        showMessage("error", "Failed to fetch persons from server");
      });
  }, []);

  const showMessage = (state, text) => {
    setMessage({ state, text });
    setTimeout(() => setMessage({ state: null, text: null }), 3000);
  };

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

    if (!cleanedName) return;
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
            showMessage("success", `Updated ${returnedPerson.name}`);
            setPersons(
              persons.map((p) =>
                p.id !== returnedPerson.id ? p : returnedPerson
              )
            );
          })
          .catch(() => {
            showMessage(
              "error",
              `Information of ${person.name} has already been removed from server`
            );
            setPersons(persons.filter(({ id }) => id !== person.id));
          });
      }

      setNewName("");
      setNewNumber("");
      return;
    }

    const newPerson = { name: cleanedName, number: cleanedNumber };
    personService
      .create(newPerson)
      .then((createdPerson) => {
        showMessage("success", `Added ${createdPerson.name}`);
        setPersons(persons.concat(createdPerson));
        setNewName("");
        setNewNumber("");
      })
      .catch(() => {
        showMessage("error", "Failed to add person");
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
      personService
        .remove(id)
        .then(() => {
          showMessage("warning", `Deleted ${name}`);
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch(() => {
          showMessage(
            "error",
            `Information of ${name} has already been removed from server`
          );
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification text={message.text} state={message.state} />
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
