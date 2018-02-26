const { EnclaveFactory } = require('./enclave')
const env = require('./env')
const input = require('./input')
const { SawtoothClientFactory } = require('./sawtooth-client')
const argv = require('yargs')
  .usage('Usage: node $0 --name [string] --verb [set,inc,dec] --value [integer]')
  .choices('verb', ['set', 'inc', 'dec'])
  .number('value')
  .string(['verb', 'name'])
  .describe('name', 'unique identifier for the entry')
  .describe('verb', 'action to take on the entry')
  .describe('value', 'value to pass to the entry')
  .example('node index.js --name foo --verb set --value 42', 'If `foo` is undefined, create it and set its value to 42')
  .example('node index.js --name foo --verb inc --value 13', 'If `foo` is defined, increment it by 13')
  .example('node index.js --name foo --verb dec --value 7', 'If `foo` is defined, decrement it by 7 (but not below 0)')
  .wrap(null)
  .demandOption(['name', 'verb', 'value'])
  .help('h')
  .alias('h', 'help')
  .argv

const enclave = EnclaveFactory(Buffer.from(env.privateKey, 'hex'))

const intkeyClient = SawtoothClientFactory({
  enclave: enclave,
  validatorURL: env.validator.url
})

const intkeyTransactor = intkeyClient.newTransactor({
  familyName: env.family.name,
  familyVersion: env.family.version
})

const newPayload = {
  Verb: argv.verb,
  Name: argv.name,
  Value: argv.value
}

if (input.payloadIsValid(newPayload)) {
  input.submitPayload(newPayload, intkeyTransactor)
} else {
  console.log('Your payload is garbage')
}
