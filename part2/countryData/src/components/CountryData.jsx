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
    <article className="country">
      <div className="country__data">
        <div className="country__info-main">
          <p>
            <span>Capital:</span> {country.capital[0]}
          </p>
          <p>
            <span>Area:</span> {country.area}
          </p>
        </div>

        <div className="country__info-secondary">
          <h3>Languages:</h3>
          <ul>
            {languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </div>
      </div>

      <figure className="country__flag">
        <img src={country.flags.png} alt={country.flags.alt} />
        <legend>{country.name.common}</legend>
      </figure>

      <div className="weather">
        <h2>
          Weather in: <span>{country.capital[0]}</span>
        </h2>

        {loading && <p className="loading">Loading...</p>}
        {!loading && (
          <div className="weather__data">
            <p>
              <span>Temperature:</span> {weatherData?.temperature?.toFixed(2)}{" "}
              Celcius
            </p>
            <p>
              <span>Wind:</span>: {weatherData?.windSpeed} m/s
            </p>
            <img src={weatherData?.icon} alt="weather icon" />
          </div>
        )}
      </div>
    </article>
  );
};

export default CountryData;
