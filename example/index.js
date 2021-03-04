"use strict";

const BrokerBin = require("../lib");

(async () => {

    // Initialize the BrokerBin
    const bbClient = new BrokerBin({
        username: process.env.BROKERBIN_USERNAME
      , password: process.env.BROKERBIN_PASSWORD
      , soap_key: process.env.BROKERBIN_SOAP_KEY
      , soap_uri: process.env.BROKERBIN_SOAP_URI
      , public_key: process.env.BROKERBIN_PUBLIC_KEY
    })

    // Authenticate
    await bbClient.authenticate()

    // Run a search
    const results = await bbClient.search("F238F", {
        max_resultset: 50
      , search_type: "partkey"
      , sort_order: "ASC"
      , sort_by: "price"
    })

    // Output the result
    console.log(results)
    // =>
    // [ { company: '...',
    //     country: 'GBR',
    //     part: 'F238FNS',
    //     mfg: 'DELL',
    //     cond: 'REF',
    //     price: '...',
    //     qty: '4',
    //     age: '0',
    //     description: 'Dell 3.5" SAS Tray Caddy R710 R610 R410 T610 - No Screws',
    //     clei: '',
    //     status: '2' }, ... ]
})()
