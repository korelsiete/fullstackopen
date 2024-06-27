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
