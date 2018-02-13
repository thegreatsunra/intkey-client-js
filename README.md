# intkey-client-js

> An intkey client using the Hyperledger Sawtooth Javascript SDK

## Getting started

```bash
git clone git@github.com:thegreatsunra/intkey-client-js.git

cd intkey-client-js

npm install
```

## Usage

```bash
cd intkey-client-js

# this will post an intkey transaction to http://localhost:8008
node index.js

# you can pass an argument to index.js to post to a different address/port:
node index.js http://192.168.1.1:8080
```

## Notes

Need an intkey transaction processor? Try [intkey-tp-js](https://github.com/thegreatsunra/intkey-client-js).
