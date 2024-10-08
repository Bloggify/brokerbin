"use strict";

const BrokerBinSOAP = require("../lib/").SOAP;
const BrokerBinREST = require("../lib").REST; // or simply require("../lib")

// SOAP Example
(async () => {

    // Initialize the BrokerBin
    const bbClient = new BrokerBinSOAP({
        username: process.env.BROKERBIN_USERNAME || "your username",
        password: process.env.BROKERBIN_PASSWORD || "your password",
        soap_key: process.env.BROKERBIN_SOAP_KEY || "your soap key",
        soap_uri: process.env.BROKERBIN_SOAP_URI || "your soap uri",
        public_key: process.env.BROKERBIN_PUBLIC_KEY || "public key"
    })

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
})();

// REST Example
(async () => {
    const bbClient = new BrokerBinREST({
        username: process.env.BROKERBIN_USERNAME || "your username",
        token: process.env.BROKERBIN_TOKEN || process.env.BROKERBIN_SOAP_KEY || "your token",
    })

    const result = await bbClient.partSearch({
        query: "F238F",
    });

    console.log(result)
})().catch(err => {
    debugger
})
