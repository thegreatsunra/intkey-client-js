// Import PRIVATE_KEY, PUBLIC_KEY, VALIDATOR_URL from .env file
require('dotenv').config()

const { leafHash } = require('./sawtooth-client')

const familyName = 'intkey'
const familyVersion = '1.0'
const env = {
  privateKey: process.env.PRIVATE_KEY || '',
  publicKey: process.env.PUBLIC_KEY || '',
  restApiUrl: process.env.REST_API_URL || 'http://localhost:8008',
  family: {
    name: familyName,
    prefix: leafHash(familyName, 6),
    version: familyVersion
  }
}

module.exports = env
