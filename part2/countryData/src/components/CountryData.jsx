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
