"use strict";

const soap = require("soap")
    , phpunserialize = require("phpunserialize")
    , Crypter = require("./crypter")

class ReportGenerator {

    /**
     * brokerbin
     * BrokerBin API wrapper for Node.js
     *
     * @name brokerbin
     * @function
     * @param {Object} auth An object containing the following data:
     *
     *    - `username` (String): The BrokerBin username.
     *    - `password` (String): The BrokerBin password.
     *    - `soapkey` (String): The BrokerBin soap key.
     *
     * @param {}  Param descrpition.
     * @return {Number} Return description.
     */
    constructor (auth, publicKey, soapUri) {

        // Set the constants
        this.PUBLIC_KEY = publicKey
        this.SOAP_URI = soapUri
        this.AUTH = auth

        // Encrypt the username and password
        const cry = new Crypter(AUTH.soapkey, publicKey)
        AUTH.username = cry.encryptUsername(AUTH.username)
        AUTH.password = cry.encryptPassword(AUTH.password)

        // Authenticate
        this.soapClient = null
        this.soapUid = null
    }

    /**
     * authenticate
     * Setup the API authentication.
     *
     * @name authenticate
     * @return {Promise} Resolves with the UID.
     */
    async authenticate () {
        return new Promise((resolve, reject) => {
            // Prepare the soap client
            soap.createClient(this.SOAP_URI, (err, client) => {
                if (err) { return reject(err) }

                this.soapClient = client

                // Authenticate
                client.Authenticate({
                    reqUsername: this.AUTH.username,
                    reqPassword: this.AUTH.password,
                    reqOptions: {}
                }, (err, { resSession }) => {
                    if (err) { return reject(err) }
                    // Get the UID
                    const UID = this.soapUid = resSession.$value
                    resolve(UID)
                })
            })
        })
    }

    /**
     * search
     * Runs a search request in BrokerBin.
     *
     * @name search
     * @return {Promise} Resolves with the results.
     */
    async search (reqPart, reqOptions) {
        return new Promise((resolve, reject) => {
            reqOptions.uid = this.soapUid
            this.soapClient.Search({
                reqPart
              , reqOptions
            }, (err, res) => {
                if (err) { return reject(err) }
                const originalRes = res.resParam.$value
                if (err) { return cb(err) }
                try {
                    res = phpunserialize(res.resParam.$value)
                } catch (e) {
                    // TODO This fails silently
                    console.error(e)
                    res = {}
                    res.resultset = [{
                        result: []
                    }]
                }
                const results = res.resultset[0].result
                resolve(results)
            })
        })
    }
}
