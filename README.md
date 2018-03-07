# intkey-client-js

> An intkey client using the Hyperledger Sawtooth Javascript SDK

## Getting started

```bash
git clone git@github.com:thegreatsunra/intkey-client-js.git

cd intkey-client-js

npm install

## Generate public/private keys and a placeholder Sawtooth REST API URL
node init.js
```

Next, open the `.env` file created by `node init.js` and change the value for `REST_API_URL` to the address and port of your Sawtooth REST API.

If you're using [sawtooth-rest-api-proxy](https://github.com/thegreatsunra/sawtooth-rest-api-proxy) you should use `https://`, set the host to the public domain address of your server, and use port `8888`.

For example:

```bash
REST_API_URL=https://awesome-server.domain.tld:8888
```

## Usage

```bash
cd intkey-client-js

# If `foo` is undefined, create it and set its value to 42
node index.js --name foo --verb set --value 42

# If `foo` is defined, increment it by 13
node index.js --name foo --verb inc --value 13

# If `foo` is defined, decrement it by 7 (but not below 0)
node index.js --name foo --verb dec --value 7

# Show help
node index.js --help

# OPTIONS
#  --name      unique identifier for the entry  [string] [required]
#  --verb      action to take on the entry      [required] [choices: "set", "inc", "dec"]
#  --value     value to pass to the entry       [integer] [required]
```

## Notes

Need an intkey transaction processor? Try [intkey-tp-js](https://github.com/thegreatsunra/intkey-client-js).
