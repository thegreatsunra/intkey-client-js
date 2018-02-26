// Import PRIVATE_KEY, PUBLIC_KEY, VALIDATOR_URL from .env file
require('dotenv').config()

const { leafHash } = require('./sawtooth-client')

const env = {
  privateKey: process.env.PRIVATE_KEY || '',
  publicKey: process.env.PUBLIC_KEY || '',
  validator: {
    url: process.env.VALIDATOR_URL || 'http://localhost:8008'
  },
  family: {
    name: 'intkey',
    prefix: leafHash('intkey', 6),
    version: '1.0'
  }
}

module.exports = env
