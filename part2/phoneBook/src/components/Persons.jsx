const Persons = ({ filteredPersons, handleDeletePerson }) => {
  return (
    <ul className="persons-list">
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
    <li className="persons-list__item">
      <span className="name">{name}</span>
      <span className="number">{number}</span>
      <button className="delete-button" onClick={handleDeletePerson}>
        Delete
      </button>
    </li>
  );
};

export default Persons;
