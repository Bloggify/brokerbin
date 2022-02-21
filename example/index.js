"use strict";

const BrokerBin = require("../lib");

(async () => {

    // Initialize the BrokerBin
    const bbClient = new BrokerBin()

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
