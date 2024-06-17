import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
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
      alert(`${cleanedName} is already added to phonebook`);
      return;
    }

    const newPerson = { name: cleanedName, number: cleanedNumber };

    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
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

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        <label htmlFor="filter">Filter shown with: </label>
        <input
          id="filter"
          type="text"
          value={filter}
          onChange={handleChangeFilter}
        />
      </div>

      <h3>Add a new</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            value={newName}
            onChange={handleChangeName}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Number: </label>
          <input
            id="phone"
            type="tel"
            value={newNumber}
            onChange={handleChangeNumber}
            required
          />
        </div>
        <div>
          <button>add</button>
        </div>
      </form>

      <h3>Numbers</h3>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default App;
