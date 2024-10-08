## Documentation

You can see below the API reference of this module.

### `BrokerBinREST(data)`
Initializes a new BrokerBinREST instance.

**Example**:

```js
const BrokerBinREST = require("brokerbin").REST

const bbClient = new BrokerBinREST({
  username: "webdevops",
  token: "..."
})
```

#### Params

- **Object** `data`: The BrokerBinREST data:
   - `username` (String): The BrokerBin username.
   - `token` (String): The BrokerBin token.
   - `api_root` (String): The BrokerBin API root (default: `https://search.brokerbin.com/api/v2`).

#### Return
- **BrokerBinREST** The BrokerBinREST instance.

### `request(endpoint, query, returnData)`
Make a request to the BrokerBin API.

#### Params

- **String** `endpoint`: The endpoint to request.
- **Object** `query`: The query object.
- **Boolean** `returnData`: If `true`, the function will return the data. If `false`, it will return the response object.

#### Return
- **Promise** The response data or the response object.

### `partSearch(data)`
Search for parts by part number.

**Example**

```js
// Initialize the BrokerBin instance
const bbClient = new BrokerBinREST({
   username: "webdevops",
   token: "..."
})

// Run a search
bbClient.partSearch({
  query: "188122-B22",
})
```

#### Params

- **Object** `data`: The search data:
   - `query` (required) the search string, part number
   - `fields` db fields to search against, possible values: partsno,manufacturer,description,condition (default: partsno)
   - `mfg[]` filter by manufacturer
   - `cond[]` filter by condition
   - `country[]` filter by country
   - `region[]` filter by region
   - `state[]` filter by state
   - `size` number of results to return (default: 10)
   - `offset` number of results to skip (default: 0, max: 900)
   - `fuzziness` percentage of search terms that require matches (default: 100%)
   - `first` myVen show first (boost 200%)
   - `last` myVen show last (de-boost 90%)
   - `never` myVen show never (filter out)
   - `priced` filter priced parts only
   - `age` only match parts this many days old, or less
   - `sort[index][field]=direction` the index, field and direction (default: sort[0][_score]=desc&sort[1][age]=desc&sort[2][company.original]=asc)
      - where index is an integer with which the lowest number takes the highest precedence and no numbers repeat -- ex: 0, 1, 2
      - and where the valid sorting fields are: age, clei.original, company.original, condition, country, manufacturer, partsno.original, price, qty, region, state
      - and where the valid sorting directions are: asc, desc

#### Return
- **Promise** The response data looks like this:
 ```js
 {
     "meta": {
         "total": 18,
         "manufacturers": [
             {
                 "key": "HP",
                 "doc_count": 18
             }
         ],
         "conditions": [
             {
                 "key": "REF",
                 "doc_count": 17
             },
             {
                 "key": "NEW",
                 "doc_count": 1
             }
         ],
         "states": [
             {
                 "key": "FL",
                 "doc_count": 6
             },
             {
                 "key": "WY",
                 "doc_count": 6
             },
             {
                 "key": "TX",
                 "doc_count": 2
             },
             {
                 "key": "KY",
                 "doc_count": 1
             },
             {
                 "key": "MN",
                 "doc_count": 1
             },
             {
                 "key": "NY",
                 "doc_count": 1
             },
             {
                 "key": "WA",
                 "doc_count": 1
             }
         ],
         "countries": [
             {
                 "key": "USA",
                 "doc_count": 18
             }
         ],
         "regions": [
             {
                 "key": "North America",
                 "doc_count": 18
             }
         ],
         "request": {
             "count": 33,
             "limit": 100
         }
     },
     "data": [
         {
             "company": "Techlogix USA",
             "country": "USA",
             "part": "188122-B22",
             "clei": "",
             "mfg": "HP",
             "cond": "REF",
             "description": "HP 18.2GB 15000RPM Ultra-160 SCSI 80-Pin LVD Hot-Pluggable 3.5-inch Hard Drive",
             "price": 0,
             "qty": 1,
             "age_in_days": 6
         },
         {
             "company": "Techlogix USA",
             "country": "USA",
             "part": "188122-B22",
             "clei": "",
             "mfg": "HP",
             "cond": "REF",
             "description": "HP 18.2GB 15000RPM Ultra-160 SCSI 80-Pin LVD Hot-Pluggable 3.5-inch Hard Drive",
             "price": 0,
             "qty": 1,
             "age_in_days": 7
         },
         "truncated..."
     ]
 }
 ```

### `partPrefix(data)`
Search for parts by the beginning (or complete) of a part number.

#### Params

- **Object** `data`: An object containing the following data:
   - `query` (required) the search string, part number, or beginning of part number
   - `mfg[]` filter by manufacturer
   - `cond[]` filter by condition
   - `country[]` filter by country
   - `region[]` filter by region
   - `state[]` filter by state
   - `size` number of results to return (default: 10)
   - `offset` number of results to skip (default: 0, max: 900)
   - `first` myVen show first (boost 200%)
   - `last` myVen show last (de-boost 90%)
   - `never` myVen show never (filter out)
   - `priced` filter priced parts only
   - `age` only match parts this many days old, or less
   - `sort[index][field]=direction` the index, field and direction (default: sort[0][_score]=desc&sort[1][age]=desc&sort[2][company.original]=asc)
     - where index is an integer with which the lowest number takes the highest precedence and no numbers repeat -- ex: 0, 1, 2
     - and where valid sorting fields are: age, clei.original, company.original, condition, country, manufacturer, partsno.original, price, qty, region, state
     - and where valid sorting directions are: asc, desc

#### Return
- **Promise** The response data looks like this:
```js
{
   "meta": {
       "total": 18,
       "request": {
           "count": 16,
           "limit": 50
       },
       "manufacturers": [
           {
               "key": "HP",
               "doc_count": 18
           }
       ],
       "conditions": [
           {
               "key": "REF",
               "doc_count": 16
           },
           {
               "key": "NEW",
               "doc_count": 2
           }
       ],
       "states": [
           {
               "key": "FL",
               "doc_count": 8
           },
           {
               "key": "NY",
               "doc_count": 3
           },
           {
               "key": "KY",
               "doc_count": 2
           },
           {
               "key": "TX",
               "doc_count": 2
           },
           {
               "key": "WA",
               "doc_count": 2
           },
           {
               "key": "MN",
               "doc_count": 1
           }
       ],
       "countries": [
           {
               "key": "USA",
               "doc_count": 18
           }
       ],
       "regions": [
           {
               "key": "North America",
               "doc_count": 18
           }
       ],
       "price": {
           "count": 18,
           "min": 0,
           "max": 65,
           "avg": 6.833333333333333,
           "sum": 123
       },
       "qty": {
           "count": 18,
           "min": 1,
           "max": 69,
           "avg": 7.277777777777778,
           "sum": 131
       }
   },
   "data": [
       {
           "company": "Serverworlds.com",
           "country": "USA",
           "part": "188122-B22",
           "clei": "",
           "mfg": "HP",
           "cond": "REF",
           "description": "18.2GB U3 15K SCSI 1 hotplug",
           "price": 65,
           "qty": 69,
           "age_in_days": 0
       },
       {
           "company": "Blitz Network Solutions Inc.",
           "country": "USA",
           "part": "188122-B21",
           "clei": "",
           "mfg": "HP",
           "cond": "REF",
           "description": "HP 18.2GB 15000RPM Ultra-160 SCSI Hot-Pluggable LVD 80-Pin 3.5-inch Hard Drive 5-7 Business Days Lead Time",
           "price": 0,
           "qty": 7,
           "age_in_days": 0
       }
       ,{"truncated":"truncated..."}
   ]
}
```

### `partStatsHistogram(data)`
Produce 90 day histogram for a single part with extended stats on price and qty.

#### Params

- **Object** `data`: An object containing the following data:
  - `query` (required) the search string, part number
  - `mfg[]` filter by manufacturer
  - `cond[]` filter by condition
  - `country[]` filter by country
  - `region[]` filter by region
  - `state[]` filter by state
  - `never` myVen show never (filter out)
  - `priced` filter priced parts only
  - `interval` the timeframe for the historgram (day,week,month, or year)
  - `from` include dates greater than or equal to this date
  - `to` include dates less than or equal to this date

#### Return
- **Promise** The response data looks like this:
```js
{
   "meta": {
       "request": {
           "count": 19,
           "limit": 25
       },
       "manufacturers": [
           {
               "key": "HP",
               "doc_count": 182
           }
       ],
       "conditions": [
           {
               "key": "REF",
               "doc_count": 154
           },
           {
               "key": "NEW",
               "doc_count": 28
           }
       ],
       "states": [],
       "countries": [
           {
               "key": "USA",
               "doc_count": 182
           }
       ],
       "regions": [
           {
               "key": "North America",
               "doc_count": 182
           }
       ]
   },
   "data": [
       {
           "date": "2023-02-01 00:00:00",
           "price_weighted_by_qty": 32.206832871652814,
           "price_stats": {
               "count": 182,
               "min": 0,
               "max": 45,
               "avg": 8.131868131868131,
               "sum": 1480,
               "sum_of_squares": 57320,
               "variance": 248.81777563096244,
               "variance_population": 248.81777563096244,
               "variance_sampling": 250.19245947422743,
               "std_deviation": 15.773958781198917,
               "std_deviation_population": 15.773958781198917,
               "std_deviation_sampling": 15.817473232922742,
               "std_deviation_bounds": {
                   "upper": 39.679785694265966,
                   "lower": -23.416049430529704,
                   "upper_population": 39.679785694265966,
                   "lower_population": -23.416049430529704,
                   "upper_sampling": 39.76681459771362,
                   "lower_sampling": -23.503078333977353
               }
           },
           "qty_stats": {
               "count": 182,
               "min": 1,
               "max": 73,
               "avg": 11.901098901098901,
               "sum": 2166,
               "sum_of_squares": 113284,
               "variance": 480.80340538582294,
               "variance_population": 480.80340538582294,
               "variance_sampling": 483.45977779126946,
               "std_deviation": 21.927229769987427,
               "std_deviation_population": 21.927229769987427,
               "std_deviation_sampling": 21.98771879461963,
               "std_deviation_bounds": {
                   "upper": 55.75555844107376,
                   "lower": -31.953360638875953,
                   "upper_population": 55.75555844107376,
                   "lower_population": -31.953360638875953,
                   "upper_sampling": 55.87653649033817,
                   "lower_sampling": -32.07433868814036
               }
           }
       }
   ]
}
```

### `rfqHistogram(data)`
Aggregated RFQ counts for a single part.

#### Params

- **Object** `data`: An object containing the following data:
  - `query` (required) the search string, part number
  - `mfg[]` filter by manufacturer
  - `cond[]` filter by condition
  - `from` include dates greater than or equal to this date
  - `to` include dates less than or equal to this date
  - `size` number of results to return (default: 10)
  - `offset` number of results to skip (default: 0, max: 900)
  - `fuzziness` percentage of search terms that require matches (default: 100%)

#### Return
- **Promise** The response data looks like this:
 ```js
 {
    "meta": {
        "request": {
            "count": 19,
            "limit": 25
        },
        "manufacturers": [
            {
                "key": "HP",
                "doc_count": 50
            }
        ],
        "conditions": [
            {
                "key": "NEW",
                "doc_count": 50
            }
        ]
    },
    "data": [
        {
            "date": "2023-01-30 00:00:00",
            "rfqs": 5
        },
        {
            "date": "2023-02-06 00:00:00",
            "rfqs": 17
        },
        {
            "date": "2023-02-13 00:00:00",
            "rfqs": 6
        },
        {
            "date": "2023-02-20 00:00:00",
            "rfqs": 6
        },
        {
            "date": "2023-02-27 00:00:00",
            "rfqs": 7
        },
        {
            "date": "2023-03-06 00:00:00",
            "rfqs": 9
        }
    ]
 }
 ```

### `supplyAndDemandHistogram(data)`
Aggregated Search and Result counts for a single part.

#### Params

- **Object** `data`: An object containing the following data:
   - `query` (required) the search string, part number
   - `mfg[]` filter by manufacturer
   - `age` only include parts this many days old, or less
   - `fuzziness` percentage of search terms that require matches (default: 100%)
   - `interval` the timeframe for the historgram (day,week,month, or year)
   - `from` include dates greater than or equal to this date
   - `to` include dates less than or equal to this date

#### Return
- **Promise** The response data looks like this:
```js
{
    "meta": {
        "request": {
            "count": 12,
            "limit": 25
        },
        "manufacturers": [
            {
                "key": "HP",
                "doc_count": 18
            },
            {
                "key": "HPE",
                "doc_count": 17
            },
            {
                "key": "ARUBA NETWORKS",
                "doc_count": 13
            },
            {
                "key": "HPE - ARUBA SWITCHING",
                "doc_count": 3
            }
        ]
    },
    "data": [
        {
            "date": "2023-02-01 00:00:00",
            "searches": 2113,
            "avg_result_count": 688
        }
    ]
}
```

### `topParts(data)`
Aggregated search counts by part for a given mfg sorted by number of searches in descending order

#### Params

- **Object** `data`: An object containing the following data:
  - `query` (required) the search string, manufacturer
  - `fuzziness` percentage of search terms that require matches (default: 100%)
  - `from` include dates greater than or equal to this date
  - `to` include dates less than or equal to this date
  - `size` the number of parts to return

#### Return
- **Promise** The response data looks like this:
```js
{
   "meta": {
       "request": {
           "count": 19,
           "limit": 25
       }
   },
   "data": [
       {
           "part": "WS-C2960X-24PS-L",
           "searches": 5475
       },
       {
           "part": "WS-C2960X-48FPS-L",
           "searches": 4154
       },
       {
           "part": "WS-C2960X-48FPD-L",
           "searches": 3661
       },
       {
           "part": "GLC-LH-SMD",
           "searches": 3244
       },
       {
           "part": "C9300-NM-8X",
           "searches": 2783
       },
       {
           "part": "N9K-C93180YC-EX",
           "searches": 2442
       },
       {
           "part": "STACK-T1-50CM",
           "searches": 2410
       },
       {
           "part": "ASR1001-X",
           "searches": 2394
       },
       {
           "part": "C9200L-48P-4X-E",
           "searches": 1955
       },
       {
           "part": "WS-C2960X-48LPS-L",
           "searches": 1886
       }
   ]
}
```

### `matches(data)`
Find users and company who searched for an exact part number.

#### Params

- **Object** `data`: An object containing the following data:
  - `query` (required) the search string, part number
  - `from` include matches on dates greater than or equal to this date
  - `never` myVen show never (filter out)
  - `in_stock` only include searchers who had the item in-stock when the search occurred

#### Return
- **Promise** The response data looks like this:
```js
{
   "meta": {
       "request": {
           "count": 44,
           "limit": 100
       }
   },
   "data": {
       "query": "c9300-nm-8x",
       "from": "2024-06-20",
       "results": {
           "count": 17,
           "matches": [
               {
                   "company_name": "Network Craze Technologies",
                   "company_contact": "James Froio",
                   "search_query": "C9300-NM-8X",
                   "qty": 26,
                   "age": "51 minutes ago"
               },
               {
                   "company_name": "NW Remarketing",
                   "company_contact": "Louis Zahler",
                   "search_query": "C9300-NM-8X",
                   "qty": 5,
                   "age": "3 hours ago"
               },
               {
                   "company_name": "Refub Tech",
                   "company_contact": "Saless Team",
                   "search_query": "C9300-NM-8X",
                   "qty": 4,
                   "age": "4 hours ago"
               },
               {
                   "company_name": "Neon Devices LLC",
                   "company_contact": "Nohail K",
                   "search_query": "C9300-NM-8X",
                   "qty": 52,
                   "age": "4 hours ago"
               },
               {
                   "company_name": "Network Integrators LTD.",
                   "company_contact": "Purchasing Team",
                   "search_query": "C9300-NM-8X",
                   "qty": 1,
                   "age": "5 hours ago"
               },
               {
                   "company_name": "Link-US LLC",
                   "company_contact": "Basem Toma",
                   "search_query": "C9300-NM-8X",
                   "qty": 1,
                   "age": "6 hours ago"
               },
               {
                   "company_name": "Crisp Technologies LLC",
                   "company_contact": "Steve Murphy",
                   "search_query": "C9300-NM-8X",
                   "qty": 10,
                   "age": "6 hours ago"
               },
               {
                   "company_name": "Nordic Computer",
                   "company_contact": "Ozren Nezic",
                   "search_query": "C9300-NM-8X",
                   "qty": 1,
                   "age": "11 hours ago"
               },
               {
                   "company_name": "Euro IT Solution LTD",
                   "company_contact": "Javed A.",
                   "search_query": "C9300-NM-8X",
                   "qty": 2,
                   "age": "12 hours ago"
               },
               {
                   "company_name": "Knowledge Computers PTE",
                   "company_contact": "N/A",
                   "search_query": "C9300-NM-8X",
                   "qty": 2,
                   "age": "12 hours ago"
               },
               {
                   "company_name": "Euro IT Solution LTD",
                   "company_contact": "Javed A.",
                   "search_query": "C9300-NM-8X",
                   "qty": 2,
                   "age": "12 hours ago"
               },
               {
                   "company_name": "Units Enterprise",
                   "company_contact": "Andy Bryant",
                   "search_query": "C9300-NM-8X",
                   "qty": 2,
                   "age": "1 day ago"
               },
               {
                   "company_name": "Units Enterprise",
                   "company_contact": "Jim Henderson",
                   "search_query": "C9300-NM-8X",
                   "qty": 2,
                   "age": "1 day ago"
               },
               {
                   "company_name": "Units Enterprise",
                   "company_contact": "Jim Henderson",
                   "search_query": "C9300-NM-8X",
                   "qty": 2,
                   "age": "1 day ago"
               },
               {
                   "company_name": "Knowledge Computers USA",
                   "company_contact": "Travis Oestreich",
                   "search_query": "c9300-nm-8x",
                   "qty": 4,
                   "age": "1 day ago"
               },
               {
                   "company_name": "Colorado Peak Technologies,Inc",
                   "company_contact": "Alex Myers",
                   "search_query": "C9300-NM-8X",
                   "qty": 3,
                   "age": "1 day ago"
               },
               {
                   "company_name": "eGoods Supply, Inc.",
                   "company_contact": "Norman",
                   "search_query": "C9300-NM-8X",
                   "qty": 4,
                   "age": "1 day ago"
               }
           ]
       }
   }
}
```

----

### `BrokerBinSOAP(auth)`
BrokerBin API wrapper for Node.js

#### Params

- **Object** `auth`: An object containing the following data:
   - `username` (String): The BrokerBin username (or ENV variable: `BROKERBIN_USERNAME`)
   - `password` (String): The BrokerBin password (or ENV variable: `BROKERBIN_PASSWORD`)
   - `soap_key` (String): The BrokerBin soap key (or ENV variable: `BROKERBIN_SOAP_KEY`)
   - `soap_uri` (String): The BrokerBin soap uri (or ENV variable: `BROKERBIN_SOAP_URI`)
   - `public_key` (String): The BrokerBin public key (or ENV variable: `BROKERBIN_PUBLIC_KEY`)

#### Return
- **BrokerBinSOAP** The `BrokerBinSOAP` instance.

### authenticate

Setup the API authentication.

#### Return
- **Promise** Resolves with the UID.

### search

Runs a search request in BrokerBin.

#### Return
- **Promise** Resolves with the results.

BrokerBin Search REST API

Authentication Headers

GET /api/v2/part/search?query=188122-b22 HTTP/1.1
Host: https://search.brokerbin.com
Authorization: Bearer WbyAftqzqFhzW5Eu
Accept: application/json
Content-Type: application/json
The token used in the above header must match the appropriate api key attached to the company. The company must also be active.

A login header may be set to define which user on the account will perform the actual search, and thus get logged as doing the search.

GET /api/v2/part/search?query=188122-b22 HTTP/1.1
Host: https://search.brokerbin.com
Authorization: Bearer WbyAftqzqFhzW5Eu
login: webdevops
Accept: application/json
Content-Type: application/json
If a login header is NOT supplied, the primary login on the company will be used.

API Version 2 Endpoints

Part Search

Search for parts by part number.

GET: /api/v2/part/search

Arguments

query (required) the search string, part number
fields db fields to search against, possible values: partsno,manufacturer,description,condition (default: partsno)
mfg[] filter by manufacturer
cond[] filter by condition
country[] filter by country
region[] filter by region
state[] filter by state
size number of results to return (default: 10)
offset number of results to skip (default: 0, max: 900)
fuzziness percentage of search terms that require matches (default: 100%)
first myVen show first (boost 200%)
last myVen show last (de-boost 90%)
never myVen show never (filter out)
priced filter priced parts only
age only match parts this many days old, or less
sort[index][field]=direction the index, field and direction (default: sort[0][_score]=desc&sort[1][age]=desc&sort[2][company.original]=asc)
where index is an integer with which the lowest number takes the highest precedence and no numbers repeat -- ex: 0, 1, 2

and where the valid sorting fields are: age, clei.original, company.original, condition, country, manufacturer, partsno.original, price, qty, region, state

and where the valid sorting directions are: asc, desc

Examples

HTTP Request

GET /api/v2/part/search?query=188122-b22&country[]=USA&mfg[]=HP&size=100&age=4 HTTP/1.1
Host: https://search.brokerbin.com
Authorization: Bearer WbyAftqzqFhzW5Eu
login: webdevops
Accept: application/json
Content-Type: application/json
PHP Guzzle

<?php
$client = new Client();
$headers = [
  'Authorization' => 'Bearer WbyAftqzqFhzW5Eu',
  'Login' => 'webdevops',
  'Accept' => 'application/json',
  'Content-Type' => 'application/json'
];
$request = new Request('GET', 'https://search.brokerbin.com/api/v2/part/search?query=188122-b22&size=100&country[]=USA&cond[]=REF&cond=NEW&mfg[]=HP', $headers);
$res = $client->sendAsync($request)->wait();
echo $res->getBody();
Shell cURL

curl --location --globoff --request GET 'https://search.brokerbin.com/api/v2/part/search?query=188122-b22&size=100&country[]=USA&cond[]=REF&cond=NEW&mfg[]=HP' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'login: webdevops' \
  --header 'Authorization: Bearer WbyAftqzqFhzW5Eu' \
Shell wget

wget --no-check-certificate --quiet \
  --method GET \
  --timeout=0 \
  --header 'Authorization: Bearer WbyAftqzqFhzW5Eu' \
  --header 'Login: webdevops' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
   'https://search.brokerbin.com/api/v2/part/search?query=188122-b22&size=100&country[]=USA&cond[]=REF&cond=NEW&mfg[]=HP' \
   -O-
Response Status: 200 Type: application/json

{
    "meta": {
        "total": 18,
        "manufacturers": [
            {
                "key": "HP",
                "doc_count": 18
            }
        ],
        "conditions": [
            {
                "key": "REF",
                "doc_count": 17
            },
            {
                "key": "NEW",
                "doc_count": 1
            }
        ],
        "states": [
            {
                "key": "FL",
                "doc_count": 6
            },
            {
                "key": "WY",
                "doc_count": 6
            },
            {
                "key": "TX",
                "doc_count": 2
            },
            {
                "key": "KY",
                "doc_count": 1
            },
            {
                "key": "MN",
                "doc_count": 1
            },
            {
                "key": "NY",
                "doc_count": 1
            },
            {
                "key": "WA",
                "doc_count": 1
            }
        ],
        "countries": [
            {
                "key": "USA",
                "doc_count": 18
            }
        ],
        "regions": [
            {
                "key": "North America",
                "doc_count": 18
            }
        ],
        "request": {
            "count": 33,
            "limit": 100
        }
    },
    "data": [
        {
            "company": "Techlogix USA",
            "country": "USA",
            "part": "188122-B22",
            "clei": "",
            "mfg": "HP",
            "cond": "REF",
            "description": "HP 18.2GB 15000RPM Ultra-160 SCSI 80-Pin LVD Hot-Pluggable 3.5-inch Hard Drive",
            "price": 0,
            "qty": 1,
            "age_in_days": 6
        },
        {
            "company": "Techlogix USA",
            "country": "USA",
            "part": "188122-B22",
            "clei": "",
            "mfg": "HP",
            "cond": "REF",
            "description": "HP 18.2GB 15000RPM Ultra-160 SCSI 80-Pin LVD Hot-Pluggable 3.5-inch Hard Drive",
            "price": 0,
            "qty": 1,
            "age_in_days": 7
        },
        "truncated..."
    ]
}
Part Prefix Search

Search for parts by the beginning (or complete) of a part number.

GET: /api/v2/part/prefix

Arguments

query (required) the search string, part number, or beginning of part number
mfg[] filter by manufacturer
cond[] filter by condition
country[] filter by country
region[] filter by region
state[] filter by state
size number of results to return (default: 10)
offset number of results to skip (default: 0, max: 900)
first myVen show first (boost 200%)
last myVen show last (de-boost 90%)
never myVen show never (filter out)
priced filter priced parts only
age only match parts this many days old, or less
sort[index][field]=direction the index, field and direction (default: sort[0][_score]=desc&sort[1][age]=desc&sort[2][company.original]=asc)
where index is an integer with which the lowest number takes the highest precedence and no numbers repeat -- ex: 0, 1, 2

and where valid sorting fields are: age, clei.original, company.original, condition, country, manufacturer, partsno.original, price, qty, region, state

and where valid sorting directions are: asc, desc

Examples

HTTP Request

GET /api/v2/part/prefix?query=188122-b2&country[]=USA&mfg[]=HP&size=100&age=4 HTTP/1.1
Host: https://search.brokerbin.com
Authorization: Bearer WbyAftqzqFhzW5Eu
login: webdevops
Accept: application/json
Content-Type: application/json
PHP Guzzle

<?php
$client = new Client();
$headers = [
  'Authorization' => 'Bearer WbyAftqzqFhzW5Eu',
  'Login' => 'webdevops',
  'Accept' => 'application/json',
  'Content-Type' => 'application/json'
];
$request = new Request('GET', 'https://search.brokerbin.com/api/v2/part/prefix?query=188122-b2&size=100&country[]=USA&cond[]=REF&cond=NEW&mfg[]=HP', $headers);
$res = $client->sendAsync($request)->wait();
echo $res->getBody();
Shell cURL

curl --location --globoff --request GET 'https://search.brokerbin.com/api/v2/part/prefix?query=188122-b2&size=100&country[]=USA&cond[]=REF&cond=NEW&mfg[]=HP' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'login: webdevops' \
  --header 'Authorization: Bearer WbyAftqzqFhzW5Eu' \
Shell wget

wget --no-check-certificate --quiet \
  --method GET \
  --timeout=0 \
  --header 'Authorization: Bearer WbyAftqzqFhzW5Eu' \
  --header 'Login: webdevops' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
   'https://search.brokerbin.com/api/v2/part/prefix?query=188122-b2&size=100&country[]=USA&cond[]=REF&cond=NEW&mfg[]=HP' \
   -O-
Response Status: 200 Type: application/json

{
    "meta": {
        "total": 18,
        "request": {
            "count": 16,
            "limit": 50
        },
        "manufacturers": [
            {
                "key": "HP",
                "doc_count": 18
            }
        ],
        "conditions": [
            {
                "key": "REF",
                "doc_count": 16
            },
            {
                "key": "NEW",
                "doc_count": 2
            }
        ],
        "states": [
            {
                "key": "FL",
                "doc_count": 8
            },
            {
                "key": "NY",
                "doc_count": 3
            },
            {
                "key": "KY",
                "doc_count": 2
            },
            {
                "key": "TX",
                "doc_count": 2
            },
            {
                "key": "WA",
                "doc_count": 2
            },
            {
                "key": "MN",
                "doc_count": 1
            }
        ],
        "countries": [
            {
                "key": "USA",
                "doc_count": 18
            }
        ],
        "regions": [
            {
                "key": "North America",
                "doc_count": 18
            }
        ],
        "price": {
            "count": 18,
            "min": 0,
            "max": 65,
            "avg": 6.833333333333333,
            "sum": 123
        },
        "qty": {
            "count": 18,
            "min": 1,
            "max": 69,
            "avg": 7.277777777777778,
            "sum": 131
        }
    },
    "data": [
        {
            "company": "Serverworlds.com",
            "country": "USA",
            "part": "188122-B22",
            "clei": "",
            "mfg": "HP",
            "cond": "REF",
            "description": "18.2GB U3 15K SCSI 1 hotplug",
            "price": 65,
            "qty": 69,
            "age_in_days": 0
        },
        {
            "company": "Blitz Network Solutions Inc.",
            "country": "USA",
            "part": "188122-B21",
            "clei": "",
            "mfg": "HP",
            "cond": "REF",
            "description": "HP 18.2GB 15000RPM Ultra-160 SCSI Hot-Pluggable LVD 80-Pin 3.5-inch Hard Drive 5-7 Business Days Lead Time",
            "price": 0,
            "qty": 7,
            "age_in_days": 0
        }
        ,{"truncated":"truncated..."}
    ]
}
Part Stats Histogram

Produce 90 day histogram for a single part with extended stats on price and qty.

GET: /api/v2/part/history/stats

Arguments

query (required) the search string, part number
mfg[] filter by manufacturer
cond[] filter by condition
country[] filter by country
region[] filter by region
state[] filter by state
never myVen show never (filter out)
priced filter priced parts only
interval the timeframe for the historgram (day,week,month, or year)
from include dates greater than or equal to this date
to include dates less than or equal to this date
Examples

HTTP Request

GET /api/v2/part/history/stats?query=188122-B22&age=30&mfg[]=HP&country[]=USA&never=null&interval=month&from=2024-09-01&to=2024-09-30 HTTP/1.1
Host: https://search.brokerbin.com
Authorization: Bearer WbyAftqzqFhzW5Eu
login: webdevops
Accept: application/json
Content-Type: application/json
PHP Guzzle

<?php
$client = new Client();
$headers = [
  'Authorization' => 'Bearer WbyAftqzqFhzW5Eu',
  'Login' => 'webdevops',
  'Accept' => 'application/json',
  'Content-Type' => 'application/json'
];
$request = new Request('GET', 'https://search.brokerbin.com/api/v2/part/history/stats?query=188122-B22&age=30&mfg[]=HP&country[]=USA&never&interval=month&from=2024-09-01&to=2024-09-30', $headers);
$res = $client->sendAsync($request)->wait();
echo $res->getBody();
Shell cURL

curl --location --globoff --request GET 'https://search.brokerbin.com/api/v2/part/history/stats?query=188122-B22&mfg[]=HP&country[]=USA&age=7' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'login: webdevops' \
  --header 'Authorization: Bearer WbyAftqzqFhzW5Eu' \
Shell wget

wget --no-check-certificate --quiet \
  --method GET \
  --timeout=0 \
  --header 'Authorization: Bearer WbyAftqzqFhzW5Eu' \
  --header 'Login: webdevops' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
   'https://search.brokerbin.com/api/v2/part/history/stats?query=188122-B22&age=7&mfg[]=HP&country[]=USA' \
   -O-
Response Status: 200 Type: application/json

{
    "meta": {
        "request": {
            "count": 19,
            "limit": 25
        },
        "manufacturers": [
            {
                "key": "HP",
                "doc_count": 182
            }
        ],
        "conditions": [
            {
                "key": "REF",
                "doc_count": 154
            },
            {
                "key": "NEW",
                "doc_count": 28
            }
        ],
        "states": [],
        "countries": [
            {
                "key": "USA",
                "doc_count": 182
            }
        ],
        "regions": [
            {
                "key": "North America",
                "doc_count": 182
            }
        ]
    },
    "data": [
        {
            "date": "2023-02-01 00:00:00",
            "price_weighted_by_qty": 32.206832871652814,
            "price_stats": {
                "count": 182,
                "min": 0,
                "max": 45,
                "avg": 8.131868131868131,
                "sum": 1480,
                "sum_of_squares": 57320,
                "variance": 248.81777563096244,
                "variance_population": 248.81777563096244,
                "variance_sampling": 250.19245947422743,
                "std_deviation": 15.773958781198917,
                "std_deviation_population": 15.773958781198917,
                "std_deviation_sampling": 15.817473232922742,
                "std_deviation_bounds": {
                    "upper": 39.679785694265966,
                    "lower": -23.416049430529704,
                    "upper_population": 39.679785694265966,
                    "lower_population": -23.416049430529704,
                    "upper_sampling": 39.76681459771362,
                    "lower_sampling": -23.503078333977353
                }
            },
            "qty_stats": {
                "count": 182,
                "min": 1,
                "max": 73,
                "avg": 11.901098901098901,
                "sum": 2166,
                "sum_of_squares": 113284,
                "variance": 480.80340538582294,
                "variance_population": 480.80340538582294,
                "variance_sampling": 483.45977779126946,
                "std_deviation": 21.927229769987427,
                "std_deviation_population": 21.927229769987427,
                "std_deviation_sampling": 21.98771879461963,
                "std_deviation_bounds": {
                    "upper": 55.75555844107376,
                    "lower": -31.953360638875953,
                    "upper_population": 55.75555844107376,
                    "lower_population": -31.953360638875953,
                    "upper_sampling": 55.87653649033817,
                    "lower_sampling": -32.07433868814036
                }
            }
        }
    ]
}
RFQ Histogram

Aggregated RFQ counts for a single part.

GET: /api/v2/part/history/rfq

Arguments

query (required) the search string, part number
mfg[] filter by manufacturer
cond[] filter by condition
from include dates greater than or equal to this date
to include dates less than or equal to this date
size number of results to return (default: 10)
offset number of results to skip (default: 0, max: 900)
fuzziness percentage of search terms that require matches (default: 100%)
Examples

HTTP Request

GET /api/v2/part/history/rfq?query=JL256A&cond[]=NEW&mfg[]=HP&never=null&interval=week&from=2024-09-01 HTTP/1.1
Host: https://search.brokerbin.com
Authorization: Bearer WbyAftqzqFhzW5Eu
login: webdevops
Accept: application/json
Content-Type: application/json
PHP Guzzle

<?php
$client = new Client();
$headers = [
  'Authorization' => 'Bearer WbyAftqzqFhzW5Eu',
  'Login' => 'webdevops',
  'Accept' => 'application/json',
  'Content-Type' => 'application/json'
];
$request = new Request('GET', 'https://search.brokerbin.com/api/v2/part/history/rfq?query=JL256A&cond[]=NEW&mfg[]=HP&never&interval=week&from=2024-09-01', $headers);
$res = $client->sendAsync($request)->wait();
echo $res->getBody();
Shell cURL

curl --location --globoff --request GET 'https://search.brokerbin.com/api/v2/part/history/rfq?query=JL256A&cond[]=NEW&mfg[]=HP&never=null&interval=week&from=2024-09-01' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'login: webdevops' \
  --header 'Authorization: Bearer WbyAftqzqFhzW5Eu' \
Shell wget

wget --no-check-certificate --quiet \
  --method GET \
  --timeout=0 \
  --header 'Authorization: Bearer WbyAftqzqFhzW5Eu' \
  --header 'Login: webdevops' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
   'https://search.brokerbin.com/api/v2/part/history/rfq?query=JL256A&cond[]=NEW&mfg[]=HP&never&interval=week&from=2024-09-01' \
   -O-
Response Status: 200 Type: application/json

{
    "meta": {
        "request": {
            "count": 19,
            "limit": 25
        },
        "manufacturers": [
            {
                "key": "HP",
                "doc_count": 50
            }
        ],
        "conditions": [
            {
                "key": "NEW",
                "doc_count": 50
            }
        ]
    },
    "data": [
        {
            "date": "2023-01-30 00:00:00",
            "rfqs": 5
        },
        {
            "date": "2023-02-06 00:00:00",
            "rfqs": 17
        },
        {
            "date": "2023-02-13 00:00:00",
            "rfqs": 6
        },
        {
            "date": "2023-02-20 00:00:00",
            "rfqs": 6
        },
        {
            "date": "2023-02-27 00:00:00",
            "rfqs": 7
        },
        {
            "date": "2023-03-06 00:00:00",
            "rfqs": 9
        }
    ]
}
Supply and Demand Histogram

Aggregated Search and Result counts for a single part.

GET: /api/v2/part/history/supply-demand

Arguments

query (required) the search string, part number
mfg[] filter by manufacturer
age only include parts this many days old, or less
fuzziness percentage of search terms that require matches (default: 100%)
interval the timeframe for the historgram (day,week,month, or year)
from include dates greater than or equal to this date
to include dates less than or equal to this date
Examples

HTTP Request

GET /api/v2/part/history/supply-demand?query=JL256A&interval=month&from=2024-09-01&to=2024-09-30 HTTP/1.1
Host: https://search.brokerbin.com
Authorization: Bearer WbyAftqzqFhzW5Eu
login: webdevops
Accept: application/json
Content-Type: application/json
PHP Guzzle

<?php
$client = new Client();
$headers = [
  'Authorization' => 'Bearer WbyAftqzqFhzW5Eu',
  'Login' => 'webdevops',
  'Accept' => 'application/json',
  'Content-Type' => 'application/json'
];
$request = new Request('GET', 'https://search.brokerbin.com/api/v2/part/history/supply-demand?query=JL256A&interval=month&from=2024-09-01&to=2024-09-30', $headers);
$res = $client->sendAsync($request)->wait();
echo $res->getBody();
Shell cURL

curl --location --globoff --request GET 'https://search.brokerbin.com/api/v2/part/history/supply-demand?query=JL256A&interval=month&from=2024-09-01&to=2024-09-30' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'login: webdevops' \
  --header 'Authorization: Bearer WbyAftqzqFhzW5Eu'
Shell wget

wget --no-check-certificate --quiet \
  --method GET \
  --timeout=0 \
  --header 'Authorization: Bearer WbyAftqzqFhzW5Eu' \
  --header 'Login: webdevops' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
   'https://search.brokerbin.com/api/v2/part/history/supply-demand?query=JL256A&interval=month&from=2024-09-01&to=2024-09-30' \
   -O-
Response Status: 200 Type: application/json

{
    "meta": {
        "request": {
            "count": 12,
            "limit": 25
        },
        "manufacturers": [
            {
                "key": "HP",
                "doc_count": 18
            },
            {
                "key": "HPE",
                "doc_count": 17
            },
            {
                "key": "ARUBA NETWORKS",
                "doc_count": 13
            },
            {
                "key": "HPE - ARUBA SWITCHING",
                "doc_count": 3
            }
        ]
    },
    "data": [
        {
            "date": "2023-02-01 00:00:00",
            "searches": 2113,
            "avg_result_count": 688
        }
    ]
}
Manufacturer Top Parts

Aggregated search counts by part for a given mfg sorted by number of searches in descending order

GET: /api/v2/mfg/top-parts

Arguments

query (required) the search string, manufacturer
fuzziness percentage of search terms that require matches (default: 100%)
from include dates greater than or equal to this date
to include dates less than or equal to this date
size the number of parts to return
Examples

HTTP Request

GET /api/v2/mfg/top-parts?query=CISCO&size=10 HTTP/1.1
Host: https://search.brokerbin.com
Authorization: Bearer WbyAftqzqFhzW5Eu
login: webdevops
Accept: application/json
Content-Type: application/json
PHP Guzzle

<?php
$client = new Client();
$headers = [
  'Authorization' => 'Bearer WbyAftqzqFhzW5Eu',
  'Login' => 'webdevops',
  'Accept' => 'application/json',
  'Content-Type' => 'application/json'
];
$request = new Request('GET', 'https://search.brokerbin.com/api/v2/mfg/top-parts?query=CISCO&size=10', $headers);
$res = $client->sendAsync($request)->wait();
echo $res->getBody();

Shell cURL

curl --location --request GET 'https://search.brokerbin.com/api/v2/mfg/top-parts?query=CISCO&size=10' \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'login: webdevops' \
  --header 'Authorization: Bearer WbyAftqzqFhzW5Eu' \
Shell wget

wget --no-check-certificate --quiet \
  --method GET \
  --timeout=0 \
  --header 'Authorization: Bearer WbyAftqzqFhzW5Eu' \
  --header 'Login: webdevops' \
  --header 'Accept: application/json' \
  --header 'Content-Type: application/json' \
   'https://search.brokerbin.com/api/v2/mfg/top-parts?query=CISCO&size=10' \
   -O-
Response Status: 200 Type: application/json

{
    "meta": {
        "request": {
            "count": 19,
            "limit": 25
        }
    },
    "data": [
        {
            "part": "WS-C2960X-24PS-L",
            "searches": 5475
        },
        {
            "part": "WS-C2960X-48FPS-L",
            "searches": 4154
        },
        {
            "part": "WS-C2960X-48FPD-L",
            "searches": 3661
        },
        {
            "part": "GLC-LH-SMD",
            "searches": 3244
        },
        {
            "part": "C9300-NM-8X",
            "searches": 2783
        },
        {
            "part": "N9K-C93180YC-EX",
            "searches": 2442
        },
        {
            "part": "STACK-T1-50CM",
            "searches": 2410
        },
        {
            "part": "ASR1001-X",
            "searches": 2394
        },
        {
            "part": "C9200L-48P-4X-E",
            "searches": 1955
        },
        {
            "part": "WS-C2960X-48LPS-L",
            "searches": 1886
        }
    ]
}
Match Your Searched-Term History

Find users and company who searched for an exact part number.

GET: /api/v2/part/history/matches

Arguments

query (required) the search string, part number
from include matches on dates greater than or equal to this date
never myVen show never (filter out)
in_stock only include searchers who had the item in-stock when the search occurred
Examples

HTTP Request

GET /api/v2/part/history/matches?query=c9300-nm-8x&from=2024-09-01&to=2024-09-30&in_stock=null HTTP/1.1
Host: https://search.brokerbin.com
Content-Type: application/json
Accept: application/json
login: webdevops
Authorization: Bearer WbyAftqzqFhzW5Eu
PHP Guzzle

<?php
$client = new Client();
$headers = [
  'Content-Type' => 'application/json',
  'Accept' => 'application/json',
  'login' => 'webdevops',
  'Authorization' => 'Bearer WbyAftqzqFhzW5Eu'
];
$request = new Request('GET', 'https://search.brokerbin.com/api/v2/part/history/matches?query=c9300-nm-8x&from=2024-09-01&in_stock', $headers);
$res = $client->sendAsync($request)->wait();
echo $res->getBody();
Shell cURL

curl --location 'https://search.brokerbin.com/api/v2/part/history/matches?query=c9300-nm-8x&from=2024-09-01&in_stock=null' \
--header 'Content-Type: application/json' \
--header 'Accept: application/json' \
--header 'login: webdevops' \
--header 'Authorization: bearer WbyAftqzqFhzW5Eu'
Shell wget

wget --no-check-certificate --quiet \
  --method GET \
  --timeout=0 \
  --header 'Content-Type: application/json' \
  --header 'Accept: application/json' \
  --header 'login: webdevops' \
  --header 'Authorization: Bearer WbyAftqzqFhzW5Eu' \
   'https://search.brokerbin.com/api/v2/part/history/matches?query=c9300-nm-8x&from=2024-09-01&in_stock'
Response Status: 200 Type: application/json

{
    "meta": {
        "request": {
            "count": 44,
            "limit": 100
        }
    },
    "data": {
        "query": "c9300-nm-8x",
        "from": "2024-06-20",
        "results": {
            "count": 17,
            "matches": [
                {
                    "company_name": "Network Craze Technologies",
                    "company_contact": "James Froio",
                    "search_query": "C9300-NM-8X",
                    "qty": 26,
                    "age": "51 minutes ago"
                },
                {
                    "company_name": "NW Remarketing",
                    "company_contact": "Louis Zahler",
                    "search_query": "C9300-NM-8X",
                    "qty": 5,
                    "age": "3 hours ago"
                },
                {
                    "company_name": "Refub Tech",
                    "company_contact": "Saless Team",
                    "search_query": "C9300-NM-8X",
                    "qty": 4,
                    "age": "4 hours ago"
                },
                {
                    "company_name": "Neon Devices LLC",
                    "company_contact": "Nohail K",
                    "search_query": "C9300-NM-8X",
                    "qty": 52,
                    "age": "4 hours ago"
                },
                {
                    "company_name": "Network Integrators LTD.",
                    "company_contact": "Purchasing Team",
                    "search_query": "C9300-NM-8X",
                    "qty": 1,
                    "age": "5 hours ago"
                },
                {
                    "company_name": "Link-US LLC",
                    "company_contact": "Basem Toma",
                    "search_query": "C9300-NM-8X",
                    "qty": 1,
                    "age": "6 hours ago"
                },
                {
                    "company_name": "Crisp Technologies LLC",
                    "company_contact": "Steve Murphy",
                    "search_query": "C9300-NM-8X",
                    "qty": 10,
                    "age": "6 hours ago"
                },
                {
                    "company_name": "Nordic Computer",
                    "company_contact": "Ozren Nezic",
                    "search_query": "C9300-NM-8X",
                    "qty": 1,
                    "age": "11 hours ago"
                },
                {
                    "company_name": "Euro IT Solution LTD",
                    "company_contact": "Javed A.",
                    "search_query": "C9300-NM-8X",
                    "qty": 2,
                    "age": "12 hours ago"
                },
                {
                    "company_name": "Knowledge Computers PTE",
                    "company_contact": "N/A",
                    "search_query": "C9300-NM-8X",
                    "qty": 2,
                    "age": "12 hours ago"
                },
                {
                    "company_name": "Euro IT Solution LTD",
                    "company_contact": "Javed A.",
                    "search_query": "C9300-NM-8X",
                    "qty": 2,
                    "age": "12 hours ago"
                },
                {
                    "company_name": "Units Enterprise",
                    "company_contact": "Andy Bryant",
                    "search_query": "C9300-NM-8X",
                    "qty": 2,
                    "age": "1 day ago"
                },
                {
                    "company_name": "Units Enterprise",
                    "company_contact": "Jim Henderson",
                    "search_query": "C9300-NM-8X",
                    "qty": 2,
                    "age": "1 day ago"
                },
                {
                    "company_name": "Units Enterprise",
                    "company_contact": "Jim Henderson",
                    "search_query": "C9300-NM-8X",
                    "qty": 2,
                    "age": "1 day ago"
                },
                {
                    "company_name": "Knowledge Computers USA",
                    "company_contact": "Travis Oestreich",
                    "search_query": "c9300-nm-8x",
                    "qty": 4,
                    "age": "1 day ago"
                },
                {
                    "company_name": "Colorado Peak Technologies,Inc",
                    "company_contact": "Alex Myers",
                    "search_query": "C9300-NM-8X",
                    "qty": 3,
                    "age": "1 day ago"
                },
                {
                    "company_name": "eGoods Supply, Inc.",
                    "company_contact": "Norman",
                    "search_query": "C9300-NM-8X",
                    "qty": 4,
                    "age": "1 day ago"
                }
            ]
        }
    }
}

