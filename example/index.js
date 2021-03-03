"use strict";

const BrokerBin = require("../lib")

(async () => {
    const bbClient = new BrokerBin()
    await bbClient.authenticate()
    const results = await bbClient.search("...", {
        max_resultset: 50
      , search_type: "partkey"
      , sort_order: "ASC"
      , sort_by: "price"
    })
    console.log(results)
})()
