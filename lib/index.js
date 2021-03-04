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
     *    - `username` (String): The BrokerBin username.
     *    - `password` (String): The BrokerBin password.
     *    - `soap_key` (String): The BrokerBin soap key.
     *    - `soap_uri` (String): The BrokerBin soap uri.
     *    - `public_key` (String): The BrokerBin public key.
     *
     * @return {Number} Return description.
     */
    constructor (auth) {

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

module.exports = BrokerBin
