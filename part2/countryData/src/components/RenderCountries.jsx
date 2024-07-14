import CountriesList from "./CountriesList";
import CountryData from "./CountryData";

const RenderCountries = ({ countriesValues, inputCountry, handleClick }) => {
  if (!inputCountry || countriesValues.length === 0) return null;

  if (countriesValues.length > 10) {
    return (
      <p className="many-matches">Too many matches, specify another filter</p>
    );
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
