# intkey-client-js

> An intkey client using the Hyperledger Sawtooth Javascript SDK

## Getting started

```bash
git clone git@github.com:thegreatsunra/intkey-client-js.git

cd intkey-client-js

npm install

# Generate public/private keys and a placeholder Sawtooth validator URL
node init.js

# Finally, open the .env file created by `node init.js` and change VALIDATOR_URL to the IP address of your Sawtooth validator
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
