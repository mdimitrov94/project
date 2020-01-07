class Hex {
    constructor(value) {
        this.value = value
    }
    valueOf() {
        return this.value
    }
    toString() {
        return '0x' + this.value.toString(16).toUpperCase()
    }
    plus(number) {
        if (number instanceof Hex) {
            return new Hex(this.value + number.valueOf())
        }
    }
    minus(number) {
        if (number instanceof Hex) {
            return new Hex(this.value - number.valueOf())
        }
    }
    parse(input) {
        return parseInt(input, 16);
    }
    
}
let FF = new Hex(255);

console.log(FF.parse('ff'))
