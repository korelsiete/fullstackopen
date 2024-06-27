const CountriesList = ({ countriesValues, handleClick }) => {
  return (
    <ul>
      {countriesValues.map((country) => (
        <li key={country.name.common}>
          <span>{country.name.common} | </span>
          <button onClick={() => handleClick(country.name.common)}>show</button>
        </li>
      ))}
    </ul>
  );
};

export default CountriesList;
