function createIncrement() {
    let value = 0
    return function increment() {
        value = value + 1
        console.log(value)
        let message = `currrent value: ${value}`
        function logger() {
            console.log(message)
        }
        function getValue() {
            return value
        }
        return {
            logger, getValue
        }
    }
}


const counter = createIncrement()
const {logger, getValue} = counter()
counter()
counter()
counter()
logger()
console.log(getValue())