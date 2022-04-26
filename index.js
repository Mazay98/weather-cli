#!/usr/bin/env node

import {Args} from "./helpers/args.js";
import {Logger} from "./services/log.service.js";
import {LocalStorage} from "./services/storage.service.js";
import {Weather} from "./services/api.service.js";

class App {
    constructor() {
        this.logger = new Logger
        this.storage = new LocalStorage("/tmp/weather-config.json")
    }
    async init(){
        const args = new Args(process.argv).getArgs()
        if (args.h || args.help) {
            this.logger.printHelp()
            return
        }

        try {
            if (args.c){
                await this.storage.Save(this.storage.DATA_MAPPER.city, args.c)
                this.logger.printSuccess("city was be saved")
            }
            if (args.t){
                await this.storage.Save(this.storage.DATA_MAPPER.token, args.t)
                this.logger.printSuccess("token was be saved")
            }

            await app.getWeather()
        } catch (e) {
            this.logger.printError(e.message)
        }
    }
    async getWeather(){
        try {
            let {city,token} = await this.storage.GetInFile()
            token = process.env.TOKEN ?? token

            if (token && city){
                const weather = await new Weather(token).get(city)
                this.logger.printWeather(weather)
            }
        } catch (e) {
            if (e?.response?.status === 404) {
                this.logger.printError('not walid city')
            }else if (e?.response?.status === 401) {
                this.logger.printError('not walid token')
            } else {
                this.logger.printError(e.message)
            }
        }

    }
}

const app = new App
await app.init()
