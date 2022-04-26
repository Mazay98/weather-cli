import {promises} from "fs"

class LocalStorage {
    DATA_MAPPER = {
        token: 'token',
        city: 'city'
    }

    constructor(path) {
        this.path = path
    }

    async Save (key, value) {
        if (!value.length) {
            throw new Error(`empty param ${key}`)
        }

        let data = {}
        data[key] = value

        try {
            if (!await this.fileExist(this.path)) {
                await promises.writeFile(this.path, JSON.stringify(data))
            }
            let readData = await this.GetInFile(this.path)
            await promises.writeFile(this.path,
                JSON.stringify(
                    Object.assign(readData,data)
                )
            )
        } catch (e) {
            throw e
        }
    }

    async GetInFile() {
        if ( !await this.fileExist(this.path)) {
            throw new Error("file not exist")
        }
        try {
            let rf = await promises.readFile(this.path)
            return JSON.parse(rf.toString())
        } catch (e) {
            throw e
        }
    }

    async fileExist() {
        try {
            await  promises.stat(this.path)
            return true
        }catch (e) {
            return false
        }
    }
}

export {LocalStorage}