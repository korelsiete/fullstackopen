const Persons = ({ filteredPersons, handleDeletePerson }) => {
  return (
    <ul>
      {filteredPersons.map(({ name, number, id }) => (
        <PersonItem
          key={name}
          name={name}
          number={number}
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

export default Persons;
