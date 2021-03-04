## Documentation

You can see below the API reference of this module.

### `brokerbin(auth)`
BrokerBin API wrapper for Node.js

#### Params

- **Object** `auth`: An object containing the following data:
   - `username` (String): The BrokerBin username.
   - `password` (String): The BrokerBin password.
   - `soap_key` (String): The BrokerBin soap key.
   - `soap_uri` (String): The BrokerBin soap uri.
   - `public_key` (String): The BrokerBin public key.

#### Return
- **Number** Return description.

### authenticate

Setup the API authentication.

#### Return
- **Promise** Resolves with the UID.

### search

Runs a search request in BrokerBin.

#### Return
- **Promise** Resolves with the results.

