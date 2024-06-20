# Phone Book

## Step 1

Create a simple phone book:

- Add names to the phone book

**States:**

```jsx
const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
const [newName, setNewName] = useState("");
```

**Functions:**

```jsx
const handleSubmit = (event) => {
  event.preventDefault();

  const trimmedName = newName.trim();
  if (trimmedName === "") return;

  const newPerson = { name: trimmedName };

  setPersons(persons.concat(newPerson));
  setNewName("");
};

const handleChangeName = (event) => {
  setNewName(event.target.value);
};
```

**Implementation:**

```jsx
<form onSubmit={handleSubmit}>
  ...
  <input id="name" value={newName} onChange={handleChangeName} />
  ...
  <button>add</button>
  ...
  <ul>
    {persons.map((person) => (
      <li key={person.name}>{person.name}</li>
    ))}
  </ul>
</form>
```

## Step 2

Prevents the user from adding names that already exist

**Function:**

```jsx
const verifyName = (name) => {
  return persons.some(
    (person) => person.name.toLowerCase() === name.toLowerCase()
  );
};
```

```jsx
const handleChangeNumber = (event) => {
  setNewNumber(event.target.value);
};
```

**Implementation:**

```jsx
const handleSubmit = (event) => {
  ...
  if (trimmedName === "") return;

  if (verifyName(trimmedName)) {
    alert(`${trimmedName} is already added to phonebook`);
    return;
  }
  ...
};
```

## Step 3

Allows users to add phone numbers to the phonebook.

**State:**

```jsx
const [newNumber, setNewNumber] = useState("");
```

**Function:**

```jsx
const cleanNumber = (number) => {
  return number
    .replace(/[^\d+]/g, " ")
    .split(/\s+/)
    .join(" ")
    .trim();
};
```

**Implementation:**

```jsx
const handleSubmit = (event) => {
  ...
  const cleanedNumber = cleanNumber(newNumber);
  ...
  if (cleanedNumber.length < 7) {
    alert("Phone number must be at least 7 digits long");
    return;
  }
  ...
  const newPerson = { name: cleanedName, number: cleanedNumber };
  ...
  setNewNumber("");
};
```

```jsx
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
```

```jsx
<ul>
  {persons.map((person) => (
    <li key={person.name}>
      {person.name} {person.number}
    </li>
  ))}
</ul>
```

## Step 4

Implement a search field that can be used to filter the list of people by name.

**State:**

```jsx
const [filter, setFilter] = useState("");
```

**Function:**

```jsx
const handleChangeFilter = (event) => {
  setFilter(event.target.value);
};
```

**Implementation:**

```jsx
const filteredPersons = persons.filter((person) =>
  person.name.toLowerCase().includes(filter.toLowerCase())
);
```

```jsx
<div>
  <label htmlFor="filter">Filter shown with: </label>
  <input id="filter" type="text" value={filter} onChange={handleChangeFilter} />
</div>
```

```jsx
<ul>
  {filteredPersons.map((person) => (
    <li key={person.name}>
      {person.name} {person.number}
    </li>
  ))}
</ul>
```

## Step 5

Refactor by extracting the appropriate parts into new components

**Components:**

```jsx
// components/Filter.jsx

const Filter = ({ filter, handleChangeFilter }) => {
  return (
    <div>
      <label htmlFor="filter">Filter shown with: </label>
      <input
        id="filter"
        type="text"
        value={filter}
        onChange={handleChangeFilter}
      />
    </div>
  );
};

export default Filter;
```

```jsx
// components/PersonForm.jsx

const PersonForm = ({
  handleSubmit,
  handleChangeName,
  handleChangeNumber,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <InputForm value={newName} onChange={handleChangeName} text="name" />
      <InputForm
        value={newNumber}
        onChange={handleChangeNumber}
        text="number"
      />
      <ButtonForm text="Add" />
    </form>
  );
};

const ButtonForm = ({ text }) => <button>{text}</button>;

const InputForm = ({ type = "text", value, onChange, text }) => {
  const textLabel = text.charAt(0).toUpperCase() + text.slice(1);
  return (
    <div>
      <label htmlFor={text}>{textLabel}: </label>
      <input id={text} type={type} value={value} onChange={onChange} />
    </div>
  );
};
export default PersonForm;
```

```jsx
// components/Persons.jsx

const Persons = ({ filteredPersons }) => {
  return (
    <ul>
      {filteredPersons.map(({ name, number }) => (
        <PersonItem key={name} name={name} number={number} />
      ))}
    </ul>
  );
};

const PersonItem = ({ name, number }) => {
  return (
    <li>
      {name} {number}
    </li>
  );
};

export default Persons;
```

## Step 6

- Store the initial state of the application in the db.json file

```json
// db.json
{
  "persons": [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
  ]
}
```

- Start json-server on port 3001 and make sure the server returns the list of people

```bash
$ json-server --watch db.json --port 3001
```

- Modify the application so that the initial state of the data is obtained from the server using the axios library.

```jsx
...
const [persons, setPersons] = useState([]);

axios
.get("http://localhost:3001/persons")
.then((response) => {
  setPersons(response.data);
});
```

- Complete the data acquisition with an Effect hook.

```jsx
import { useEffect } from "react";

...

useEffect(() => {
  axios
  .get("http://localhost:3001/persons")
  .then((response) => {
    setPersons(response.data);
  });
}, []);
```

## Step 7

Currently, numbers that are added to the phone book are not saved on a backend server. Solve this situation.

**Solution:**

```jsx
const handleSubmit = (event) => {
  ...
  axios
  .post("http://localhost:3001/persons", newPerson)
  .then((response) => {
    setPersons(persons.concat(response.data));
    setNewName("");
    setNewNumber("");
  });
}
```

## Step 8

Extract the code that handles communication with the backend into its own module

**Create a new service:**

```js
// services/persons.js

import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

export default { getAll, create };
```

**Implement the service:**

```jsx
useEffect(() => {
  personService.getAll().then((initialPersons) => setPersons(initialPersons));
}, []);
```

```jsx
personService.create(newPerson).then((createdPerson) => {
  setPersons(persons.concat(createdPerson));
  setNewName("");
  setNewNumber("");
});
```

## Step 9

Allows users to delete phonebook entries

**New remove method:**

```js
// services/persons.js
...

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, create, remove };
```

**handleDeletePerson:**

```jsx
const handleDeletePerson = (id) => {
  const { name } = persons.find((person) => person.id === id);
  const confirmDelete = confirm(`Delete ${name}?`);

  if (confirmDelete) {
    personService.remove(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
    });
  }
};
```

**Implementation:**

```jsx
// App.jsx

<Persons
  filteredPersons={filteredPersons}
  handleDeletePerson={handleDeletePerson}
/>
```

```jsx
// components/Persons.jsx

const Persons = ({ filteredPersons, handleDeletePerson }) => {
  return (
    <ul>
      {filteredPersons.map(({ name, number, id }) => (
        <PersonItem
          ...
          handleDeletePerson={() => handleDeletePerson(id)}
        />
      ))}
    </ul>
  );
};

const PersonItem = ({ name, number, handleDeletePerson }) => {
  return (
    <li>
      {name} {number}
      <button onClick={handleDeletePerson}>Delete</button>
    </li>
  );
};
```

## Step 10

Changes the functionality so that if a number is added to an existing user, the new number replaces the old one.

**New update method:**

```js
// services/persons.js

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};
```

**Implementation:**

```jsx

const handleSubmit = (event) => {
  ...

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
}
```

## Step 11

Show a notification that lasts a few seconds after a successful operation is executed

**New component:**

```jsx
// components/Notification.jsx

const Notification = ({ text, state }) => {
  if (text === null) {
    return null;
  }

  return <div className={`notification ${state}`}>{text}</div>;
};

export default Notification;
```

**Styles:**

```css
/* index.css */

.notification {
  color: #565656;
  background-color: #d8d8d8;
  font-size: 18px;
  font-family: sans-serif;
  font-weight: 600;
  border-style: solid;
  border-width: 3px;
  border-radius: 4px;
  padding: 10px;
  margin: 10px;
}

.error {
  background-color: #f8d7da;
  color: #b50719;
}

.success {
  background-color: #d1e7dd;
  color: #0f5132;
}

.warning {
  background-color: #fff3cd;
  color: #664d03;
}
```

**State:**

```jsx
const [message, setMessage] = useState({ state: null, text: null });
```

**Function:**

```jsx
const showMessage = (state, text) => {
  setMessage({
    state,
    text,
  });

  setTimeout(() => {
    setMessage({ state: null, text: null });
  }, 3000);
};
```

**Implementation:**

```jsx
const handleSubmit = (event) => {
  ...
  personService
    .update(person.id, updatedPerson)
    .then((returnedPerson) => {
      showMessage("success", `Updated ${returnedPerson.name}`);
      ...
  });
  ...
  personService
    .create(newPerson)
    .then((createdPerson) => {
      showMessage("success", `Added ${createdPerson.name}`);
      ...
    });
}
```

```jsx
const handleDeletePerson = (id) => {
  ...
  personService
    .remove(id)
    .then(() => {
      showMessage("warning", `Deleted ${name}`);
      ...
    });
  }
```

```jsx
return (
  ...
  <Notification text={message.text} state={message.state} />
  ...
)
```
