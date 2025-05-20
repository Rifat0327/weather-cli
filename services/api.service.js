import axios from "axios";
import { printError, printSuccess } from "./log.service.js";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";

export const getWeather = async (city) => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token);

  try {
    if (!token || token.trim() === "") {
      throw new Error(
        "API key not found. Please specify it using the command -t [API_KEY]"
      );
    }
    const { data } = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          appid: token,
          units: "metric",
          lang: "ru",
          q: city,
        },
      }
    );
    printSuccess(" Weather information received ");
    return {
      description: data.weather[0].description,
      temperature: data.main.temp,
      cityName: data.name,
      wind: data.wind.speed,
      feels: data.main.feels_like,
      humidity: data.main.humidity,
      clouds: data.clouds.all,
      icon: data.weather[0].icon
    };
  } catch (err) {
    if (err?.response?.status === 404) {
      printError(`The city is specified incorrectly: ${err.message}`);
    } else if (err?.response?.status === 401) {
      printError(`The token is specified incorrectly: ${err.message}`);
    } else {
      printError(err.message);
    }
    return null;
  }
};
// const url = new URL("https://api.openweathermap.org/data/2.5/weather");
// url.searchParams.append("appid", token);
// url.searchParams.append("units", "metric");
// url.searchParams.append("lang", "ru");
// url.searchParams.append("q", city);
// const weatherData = await new Promise((resolve, reject) => {
//   let data = [];
//   const req = https.get(url, (res) => {
//     if (res.statusCode < 200 || res.statusCode >= 300) {
//       res.resume();
//       return reject(
//         new Error(`HTTP Error ${res.statusCode}: ${res.statusMessage}`)
//       );
//     }

//     res.on("data", (chunk) => {
//       data.push(chunk);
//     });

//     res.on("error", (err) => {
//       reject(new Error(`Response error: ${err.message}`));
//     });

//     res.on("end", () => {
//       try {
//         resolve(JSON.parse(Buffer.concat(data).toString()));
//       } catch (error) {
//         reject(new Error("Weather data parsing failed"));
//       }
//     });
//   });

//   req.on("error", (err) => {
//     reject(err.message);
//   });
// });
// return weatherData;

// 1. data.weather[0].description
// 2. data.main.temp
// 3. data.wind.speed
// 4. data.name
/* {
  coord: { lon: -0.1257, lat: 51.5085 },
  weather: [
    {
      id: 803,
      main: 'Clouds',
      description: 'облачно с прояснениями',
      icon: '04d'
    }
  ],
  base: 'stations',
  main: {
    temp: 13.49,
    feels_like: 12.67,
    temp_min: 13.09,
    temp_max: 14.17,
    pressure: 1024,
    humidity: 68,
    sea_level: 1024,
    grnd_level: 1020
  },
  visibility: 10000,
  wind: { speed: 3.13, deg: 47, gust: 4.02 },
  clouds: { all: 78 },
  dt: 1747326437,
  sys: {
    type: 2,
    id: 2075535,
    country: 'GB',
    sunrise: 1747282115,
    sunset: 1747338318
  },
  timezone: 3600,
  id: 2643743,
  name: 'Лондон',
  cod: 200
}
  name: 'Лондон',
  cod: 200
} */
