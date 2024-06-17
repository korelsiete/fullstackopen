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
