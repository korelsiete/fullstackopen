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
