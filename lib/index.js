"use strict";

const soap = require("soap")
    , phpunserialize = require("phpunserialize")
    , Cypher = require("./cypher")

class BrokerBin {

    /**
     * brokerbin
     * BrokerBin API wrapper for Node.js
     *
     * @name brokerbin
     * @function
     * @param {Object} auth An object containing the following data:
     *
     *    - `username` (String): The BrokerBin username (or ENV variable: `BROKERBIN_USERNAME`)
     *    - `password` (String): The BrokerBin password (or ENV variable: `BROKERBIN_PASSWORD`)
     *    - `soap_key` (String): The BrokerBin soap key (or ENV variable: `BROKERBIN_SOAP_KEY`)
     *    - `soap_uri` (String): The BrokerBin soap uri (or ENV variable: `BROKERBIN_SOAP_URI`)
     *    - `public_key` (String): The BrokerBin public key (or ENV variable: `BROKERBIN_PUBLIC_KEY`)
     *
     * @return {Number} Return description.
     */
    constructor (auth = {}) {

        auth.username = auth.username || process.env.BROKERBIN_USERNAME
        auth.password = auth.password || process.env.BROKERBIN_PASSWORD
        auth.soap_key = auth.soap_key || process.env.BROKERBIN_SOAP_KEY
        auth.soap_uri = auth.soap_uri || process.env.BROKERBIN_SOAP_URI
        auth.public_key = auth.public_key || process.env.BROKERBIN_PUBLIC_KEY

        const {
            username
          , password
          , soap_key
          , soap_uri
          , public_key
        } = auth

        // Set the constants
        this.PUBLIC_KEY = public_key
        this.SOAP_URI = soap_uri
        this.AUTH = auth

        // Encrypt the username and password
        const cry = new Cypher(soap_key, public_key)
        this.AUTH.username = cry.encryptUsername(this.AUTH.username)
        this.AUTH.password = cry.encryptPassword(this.AUTH.password)

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
                    if (UID === "Failed Authentication") {
                        return reject(new Error("Failed BrokerBin authentication."))
                    }
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
        if (!this.soapUid) {
            await this.authenticate()
        }
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
                    // TODO This fails quite silently
                    console.error(e)
                    console.error("The original response is: ", res)
                    res = {}
                    res.resultset = [{
                        result: []
                    }]
                }

                let results = res && res.resultset && res.resultset[0] && res.resultset[0].result
                if (!Array.isArray(results)) {
                    console.warn(`Brokerbin result is not an array.`, results)
                    console.warn(results)
                    results = []
                }

                resolve(results)
            })
        })
    }
}

module.exports = BrokerBin
