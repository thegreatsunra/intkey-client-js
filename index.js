const { EnclaveFactory } = require('./enclave')
const env = require('./env')
const input = require('./input')
const { SawtoothClientFactory } = require('./sawtooth-client')
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
