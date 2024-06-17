import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default App;
