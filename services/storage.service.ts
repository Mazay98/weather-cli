import {promises} from "fs"

enum StorageKeys {
    city = 'city',
    token = 'token'
}

interface IGetFileResponse {
    city: string
    token: string
}

class LocalStorage {
    constructor(private path: string) {
    }

    public async Save(key: string, value: string) {
        if (!value.length) {
            throw new Error(`empty param ${key}`)
        }

        try {
            const data: { [key: string]: string } = {}
            data[key] = value

            if (!await LocalStorage.fileExist(this.path)) {

                await promises.writeFile(this.path, JSON.stringify(data))
            }
            let readData = await this.GetInFile()

            await promises.writeFile(this.path,
                JSON.stringify(
                    Object.assign(readData, data)
                )
            )
        } catch (e) {
            throw e
        }
    }

    public async GetInFile(): Promise<IGetFileResponse> {
        if (!await LocalStorage.fileExist(this.path)) {
            throw new Error("file not exist")
        }
        try {
            let rf = await promises.readFile(this.path)
            return JSON.parse(rf.toString())
        } catch (e) {
            throw e
        }
    }

    private static async fileExist(path: string): Promise<boolean> {
        try {
            await promises.stat(path)
            return true
        } catch (e) {
            return false
        }
    }
}

export {LocalStorage, IGetFileResponse, StorageKeys}