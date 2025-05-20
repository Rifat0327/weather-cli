import { join, resolve } from "path";
import { writeFile, mkdir, readFile } from "fs/promises";
import { isExist } from "../helpers/isExist.js";
import { printError } from "./log.service.js";

const dirname = import.meta.dirname;
const dbPath = resolve(dirname, "..", "db");
const dbPathFile = resolve(dirname, "..", "db", "weather-data.json");

export const TOKEN_DICTIONARY = {
  token: "token",
  city: "city",
};

const readExistFile = async (filePath) => {
  if (await isExist(filePath)) {
    const file = await readFile(filePath);
    const data = JSON.parse(file);
    return { ...data };
  } else {
    return {};
  }
};

export const saveKeyValue = async (key, value) => {
  try {
    let data = {};

    data = await readExistFile(dbPathFile);

    data[key] = value;

    if (!dbPath) {
      await mkdir(dbPath);
    }
    await writeFile(dbPathFile, JSON.stringify(data));
  } catch (err) {
    throw new Error(`Error when saving: ${err.message}`);
  }
};

export const getKeyValue = async (key) => {
  const data = await readExistFile(dbPathFile);
  return data[key];
};
