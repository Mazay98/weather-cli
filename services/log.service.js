import chalk from "chalk";

class Logger {
    printError(msg){
        console.log(chalk.bgRed("Error") + " " + msg)
    }
    printSuccess(msg){
        console.log(chalk.bgGreen("Success") + " " + msg)
    }
    printHelp(){
        console.log(chalk.bgCyan("HELP") +
            "\nYou have use commands:" +
            "\nHelp: -h" +
            "\nSet city: -c [CITY]" +
            "\nSet token: -t [TOKEN]"
        )
    }
    printWeather(res){
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

