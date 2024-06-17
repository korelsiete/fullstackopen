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
