# Country Data

## Step 1

Create an application that allows you to view information from different countries.

**Service:**

```js
// services/countries.js

import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/all`);
  return response.data;
};

const getByName = async (name) => {
  const response = await axios.get(`${baseUrl}/name/${name}`);
  return response.data;
};

export default { getAll, getByName };
```

**States:**

```jsx
const [inputCountry, setInputCountry] = useState("");
const [countries, setCountries] = useState([]);
const [loading, setLoading] = useState(false);
```

**Effects:**

```jsx
useEffect(() => {
  setLoading(true);
  countryService.getAll().then((countries) => {
    setCountries(countries);
    setLoading(false);
  });
}, []);
```

**Controls**

```jsx
const filteredCountries = countries.filter((country) => {
  const common = country.name.common;
  return common.toLowerCase().includes(inputCountry.toLowerCase());
});

...

const handleChange = (event) => {
  setInputCountry(event.target.value);
};
```

**Components:**

```jsx
const CountryList = ({ countrieValues, inputCountry }) => {
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
        <li key={country.name.common}>{country.name.common}</li>
      ))}
    </ul>
  );
};
```

**Implementation:**

```jsx
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
        />
      )}
    </div>
  </div>
);
```

## Step 2

Show a button for each country on the list that shows the view of the country

**Functions: **

```jsx
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
```

```jsx
const handleClick = (name) => {
  setInputCountry(name);
};
```

**Implementation:**

```jsx
const CountryList = ({ countrieValues, inputCountry, handleClick }) => {
  ...
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
```

## Step 3

Shows weather data for the selected country

**Service:**

```js
// services/weather.js
import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5";

const getCapitalWeather = async (name) => {
  const response = await axios.get(
    `${baseUrl}/weather?q=${name}&APPID=${
      import.meta.env.VITE_API_OPENWEATHERMAP_KEY
    }`
  );
  return response.data;
};

export default { getCapitalWeather };
```

**Components:**

```jsx
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
```

```jsx
import weatherService from "../services/weather";
import { useEffect, useState } from "react";

const CountryData = ({ country }) => {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const languages = Object.values(country.languages);

  useEffect(() => {
    setLoading(true);
    weatherService.getCapitalWeather(country.capital[0]).then((weather) => {
      const data = {
        temperature: weather.main.temp - 273.15,
        windSpeed: weather.wind.speed,
        icon: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
      };
      setWeatherData(data);
      setLoading(false);
    });
  }, [country]);

  return (
    <article>
      <div>
        <h1>{country.name.common}</h1>
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

      <div>
        <h2>Weather in {country.capital[0]}</h2>

        {loading && <p>Loading...</p>}
        {!loading && (
          <div>
            <p>Temperature: {weatherData?.temperature?.toFixed(2)} Celcius</p>
            <img src={weatherData?.icon} alt="weather icon" />
            <p>Wind: {weatherData?.windSpeed} m/s</p>
          </div>
        )}
      </div>
    </article>
  );
};

export default CountryData;
```

```jsx
import CountriesList from "./CountriesList";
import CountryData from "./CountryData";

const RenderCountries = ({ countriesValues, inputCountry, handleClick }) => {
  if (!inputCountry || countriesValues.length === 0) return null;

  if (countriesValues.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countriesValues.length > 1) {
    return (
      <CountriesList
        countriesValues={countriesValues}
        handleClick={handleClick}
      />
    );
  }

  return <CountryData country={countriesValues[0]} />;
};

export default RenderCountries;
```

**Implementation:**

```jsx
// App.jsx

{
  !loading && (
    <RenderCountries
      countriesValues={filteredCountries}
      inputCountry={inputCountry}
      handleClick={handleClick}
    />
  );
}
```
