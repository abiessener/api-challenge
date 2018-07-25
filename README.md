# API Challenge
This is a case study demonstrating a proof of concept for an intermediate API that gets data from an external API, combines it with data from a local database, and returns that data as JSON to the requesting agent.

## Usage

### GET /product/{id}
Response 200: JSON describing product. Example:
> `{"id":13860428,"name":"The Big Lebowski (Blu-ray) (Widescreen)","current_price":{"value": 13.49,"currency_code":"USD"}}`

Response 404: Product code not found in external API.

### PUT /product/{id}
Matches title, updates price according to request body.

BODY: Product definition. Example:
> `{"name":"The Big Lebowski (Blu-ray) (Widescreen)","current_price":{"value": 13.49,"currency_code":"USD"}}`

Response 200: OK (product definition updated in local database)
Response 404: Product name not found in local database.

### POST /product/{id}
Scrapes the external API and puts product data in local database if found (with randomized pricing data).

No BODY.

Response 200: OK (product found, database updated)
Response 404: Product id not found in external API.

### scrape.sh
`bash scrape.sh {startingId} {endingId}`
Scrapes info about productIds from the external API into the local database, in sequential order from startingId to endingId. Uses POST route.

## Copyright
All code (c) Adam Biessener
