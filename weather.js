#!usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.service.js";
import {
  printError,
  printHelp,
  printSuccess,
  printWeather,
} from "./services/log.service.js";
import {
  getKeyValue,
  saveKeyValue,
  TOKEN_DICTIONARY,
} from "./services/storage.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Token not transferred");
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Token saved successfully");
  } catch (error) {
    printError(error.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("City not transferred");
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess("The city was saved successfully");
  } catch (err) {
    printError(err.message);
  }
};

const weather = async () => {
  const city = process.env.CITY || (await getKeyValue(TOKEN_DICTIONARY.city));

  const weather = await getWeather(city);
  if (weather) {
    printWeather(weather);
  }
};

const initCLI = async () => {
  const args = getArgs(process.argv);

  if (args.s) {
    await saveCity(args.s);
    return;
  } else if (args.h) {
    printHelp();
    return;
  } else if (args.t) {
    await saveToken(args.t);
    return;
  }

  return await weather();
};

initCLI();
