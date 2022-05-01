import {Args, PreparedArgs} from "../helpers/args.js";
import {Logger} from "./log.service.js";
import {LocalStorage, IGetFileResponse, StorageKeys} from "./storage.service.js";
import {Weather} from "./api.service.js";

class App {
    private logger: Logger = new Logger
    private storage: LocalStorage = new LocalStorage("/tmp/weather-config.json")
    private isHelp: boolean = false

    async init() {
        try {
            const args = new Args(process.argv).getArgs()
            if (args !== undefined) await this.saveArgs(args);
        } catch (e: any) {
            this.logger.printError(e.message)
        }
    }

    async getWeather() {
        if (this.isHelp) return

        try {
            const params: IGetFileResponse = await this.storage.GetInFile()
            if (params === undefined) return
            const weather = await new Weather(params.token).get(params.city)
            this.logger.printWeather(weather)
        } catch (e: any) {
            if (e?.response?.status === 404) {
                this.logger.printError('not walid city')
            } else if (e?.response?.status === 401) {
                this.logger.printError('not walid token')
            } else {
                this.logger.printError(e.message)
            }
        }

    }

    private async saveArg(data: { key: string, value: string }, msg: string) {
        await this.storage.Save(data.key, data.value)
        this.logger.printSuccess(msg)
    }

    private async saveArgs(args: PreparedArgs) {
        for (const arg of args) {
            if (arg.key == 'h' || arg.key == 'help') {
                this.logger.printHelp();
                this.isHelp = true
                return
            } else if (arg.key == 'c' && typeof arg.value == "string") {
                await this.saveArg({key: StorageKeys.city, value: arg.value}, "city was be saved");
            } else if (arg.key == 't' && typeof arg.value == "string") {
                await this.saveArg({key: StorageKeys.token, value: arg.value}, "token was be saved");
            }
        }
    }
}

export {App}