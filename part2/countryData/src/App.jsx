import { useEffect, useState } from "react";
import countryService from "./services/countries";
import RenderCountries from "./components/RenderCountries";

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
          <RenderCountries
            countriesValues={filteredCountries}
            inputCountry={inputCountry}
            handleClick={handleClick}
          />
        )}
      </div>
    </div>
  );
};

export default App;
