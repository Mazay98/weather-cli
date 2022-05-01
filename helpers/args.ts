interface IArg {
    key?: string
    value?: string | boolean
}
type PreparedArgs = IArg[]

class Args {
    args: IArg[] | undefined

    constructor(args: string[]) {
        this.setArgs(args)
    }
    setArgs (args: string[]) {
        const [executer, file, ...rest] = args

        let res: PreparedArgs = []
        rest.forEach((value, index, array) =>{
            if (value.charAt(0) === '-') {
                if (index === array.length - 1){
                    res.push({key: value.substring(1), value: true})
                    return
                }
                let nextElement = array[index+1]

                if (nextElement.charAt(0) === '-'){
                    res.push({key: value.substring(1), value: true})
                } else {
                    res.push({key: value.substring(1), value: nextElement})
                }
            }
        })

        this.args = res
    }
    getArgs() {
        return this.args
    }
}

export {Args, PreparedArgs}