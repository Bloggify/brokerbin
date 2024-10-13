const BrokerBinREST = require("../lib");

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
})().catch(console.error)
