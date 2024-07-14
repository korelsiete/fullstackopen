const CountriesList = ({ countriesValues, handleClick }) => {
  return (
    <ul className="countries">
      {countriesValues.map((country) => (
        <li key={country.name.common}>
          <button
            className="country-button"
            onClick={() => handleClick(country.name.common)}
          >
            {country.name.common}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CountriesList;
