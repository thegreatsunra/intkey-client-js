# intkey-client-js

> An intkey client/transactor using the Hyperledger Sawtooth Javascript SDK

## Getting started

```bash
git clone git@github.com:thegreatsunra/intkey-client-js.git

cd intkey-client-js

npm install

## Generate public/private keys and a placeholder Sawtooth REST API URL
node init.js
```

### Configuring the Sawtooth REST API URL

By default, the intkey client will attempt to connect to a Sawtooth REST API at `http://localhost:8008`.

To connect to a REST API at a different URL:

1. Edit the `.env` file, which was created above by running `node init.js`
1. In `.env`, change the value of `REST_API_URL` to the location of your Sawtooth REST API
1. The next time you run `node index.js` the URL you specified in `.env` will be used automatically 

If you're using [sawtooth-rest-api-proxy](https://github.com/thegreatsunra/sawtooth-rest-api-proxy) you should use `https://`, set the host to the public domain address of your server, and use port `8888`.

For example:

```bash
REST_API_URL=https://my-sawtooth-api-proxy.my-domain.tld:8888
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

## License

The MIT License (MIT)

Copyright (c) 2018 Dane Petersen
