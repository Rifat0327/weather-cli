import chalk from "chalk";
import dedent from "dedent-js";

export const printError = (error) => {
  console.log(dedent(chalk.bgRed(` ${error} `)));
};
export const printSuccess = (text) => {
  console.log(dedent(chalk.bgGreen(` ${text} `)));
};
export const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan(" Помощь ")}
         Без аргументов: вывод погоды
         -s [CITY] для установки города
         -t [API_KEY] для установки токена
         -h помощь
      `
  );
};

export const printWeather = (req) => {
  console.log(
    dedent`${chalk.bgCyan(" Weather ")}
        Город: ${req.cityName}
        Погода: ${req.description}
        Температура: ${req.temperature}°C
        Ощущается как: ${req.feels}°C
        Облачность: ${req.humidity}%
        Ветер: ${req.wind} м/с
      `
  );
};
