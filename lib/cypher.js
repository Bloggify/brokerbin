const MCrypt = require("mcrypt").MCrypt

module.exports = class Crypter {

    constructor (privateKey, PUBLIC_KEY) {
        this.privateKey = privateKey
        this.publicKey = PUBLIC_KEY
    }

    encrypt (input, key) {
        const cypher = new MCrypt("blowfish", "ecb")
        cypher.validateKeySize(false)
        cypher.open(key)
        return cypher.encrypt(input).toString("base64")
    }

    encryptUsername (input) {
        return this.encrypt(input, this.publicKey)
    }

    encryptPassword (input) {
        return this.encrypt(input, this.privateKey)
    }
}
