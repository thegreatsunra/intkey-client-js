const cbor = require('cbor')
const request = require('request')
const { createContext, CryptoFactory } = require('sawtooth-sdk/signing')
const { createHash } = require('crypto')
const { protobuf } = require('sawtooth-sdk')

const context = createContext('secp256k1')
const privateKey = context.newRandomPrivateKey()
const signer = new CryptoFactory(context).newSigner(privateKey)

