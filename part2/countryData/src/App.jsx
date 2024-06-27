import { useEffect, useState } from "react";
import countryService from "./services/countries";

const App = () => {
  const [inputCountry, setInputCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  const filteredCountries = filterCountries(inputCountry);

  function filterCountries(input) {
    input = input.trim().toLowerCase();

    const prevCountries = countries.filter((country) => {
      const common = country.name.common;
      return common.toLowerCase().includes(inputCountry.toLowerCase());
    });

    for (const country of prevCountries) {
      const name = country.name.common.toLowerCase();
      if (name === input) return [country];
    }

    return prevCountries;
  }

  useEffect(() => {
    setLoading(true);
    countryService.getAll().then((countries) => {
      setCountries(countries);
      setLoading(false);
    });
  }, []);

  const handleChange = (event) => {
    setInputCountry(event.target.value);
  };

  const handleClick = (name) => {
    setInputCountry(name);
  };

  return (
    <div>
      <div>
        <label htmlFor="country">find countries: </label>
        <input
          id="country"
          type="text"
          value={inputCountry}
          onChange={handleChange}
        />
      </div>

      <div>
        {loading && <p>Loading...</p>}
        {!loading && (
          <CountryList
            countrieValues={filteredCountries}
            inputCountry={inputCountry}
            handleClick={handleClick}
          />
        )}
      </div>
    </div>
  );
};

const CountryList = ({ countrieValues, inputCountry, handleClick }) => {
  if (!inputCountry) return null;

  if (countrieValues.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countrieValues.length === 1) {
    const country = countrieValues[0];
    const languages = Object.values(country.languages);
    return (
      <article>
        <h1>{country.name.common}</h1>

        <div>
          <p>Capital: {country.capital[0]}</p>
          <p>Area: {country.area}</p>
        </div>

        <div>
          <h3>Languages:</h3>
          <ul>
            {languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </div>

        <figure>
          <img src={country.flags.png} alt={country.flags.alt} />
        </figure>
      </article>
    );
  }

  return (
    <ul>
      {countrieValues.map((country) => (
        <li key={country.name.common}>
          <span>{country.name.common} | </span>
          <button onClick={() => handleClick(country.name.common)}>show</button>
        </li>
      ))}
    </ul>
  );
};

export default App;
