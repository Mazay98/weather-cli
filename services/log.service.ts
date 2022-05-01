import chalk from "chalk";
import {IWeatherResponse} from "./api.service.js"

class Logger {
    printError(msg: string) {
        console.log(chalk.bgRed("Error") + " " + msg)
    }

    printSuccess(msg: string) {
        console.log(chalk.bgGreen("Success") + " " + msg)
    }

    printHelp() {
        console.log(chalk.bgCyan("HELP") +
            "\nYou have use commands:" +
            "\nHelp: -h" +
            "\nSet city: -c [CITY]" +
            "\nSet token: -t [TOKEN]"
        )
    }

    printWeather(res: IWeatherResponse) {
        console.log(chalk.bgYellow("Погода в городе " + res.name) +
            "\nСкорость ветра: " + res.wind.speed +
            "\nОблачность: " + res.weather[0].description +
            "\nТемпература: " + res.main.temp + " градусов" +
            "\nВлажность: " + res.main.humidity + "%" +
            "\nДавление: " + res.main.pressure + "па"
        )
    }
}


export {Logger}

