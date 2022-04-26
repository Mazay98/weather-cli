class Args {
    constructor(args) {
        this.setArgs(args)
    }
    setArgs (args) {
        const [executer, file, ...rest] = args
        const res = {}
        rest.forEach((value, index, array) =>{
            if (value.charAt(0) === '-') {
                if (index === array.length - 1){
                    res[value.substring(1)] = true
                    return
                }

                let nextElement = array[index+1]

                if (nextElement.charAt(0) === '-'){
                    res[value.substring(1)] = true
                } else {
                    res[value.substring(1)] = nextElement
                }
            }
        })

        this.args = res
    }
    getArgs() {
        return this.args
    }
}

export {Args}