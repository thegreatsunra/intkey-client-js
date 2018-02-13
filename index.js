const cbor = require('cbor')
const request = require('request')
const { createContext, CryptoFactory } = require('sawtooth-sdk/signing')
const { createHash } = require('crypto')
const { protobuf } = require('sawtooth-sdk')

const context = createContext('secp256k1')
const privateKey = context.newRandomPrivateKey()
const signer = new CryptoFactory(context).newSigner(privateKey)

// use REST API address:port provided by user at command line
// if a custom address isn't provided, default to localhost:8008
const address = process.argv[2] || 'http://localhost:8008'

const payload = {
  Verb: 'inc',
  Name: 'foo',
  Value: 42
}

const payloadBytes = cbor.encode(payload)

const transactionHeaderBytes = protobuf.TransactionHeader.encode({
  familyName: 'intkey',
  familyVersion: '1.0',
  inputs: ['1cf1266e282c41be5e4254d8820772c5518a2c5a8c0c7f7eda19594a7eb539453e1ed7'],
  outputs: ['1cf1266e282c41be5e4254d8820772c5518a2c5a8c0c7f7eda19594a7eb539453e1ed7'],
  signerPublicKey: signer.getPublicKey().asHex(),
  // In this example, we're signing the batch with the same private key,
  // but the batch can be signed by another party, in which case, the
  // public key will need to be associated with that key.
  batcherPublicKey: signer.getPublicKey().asHex(),
  // In this example, there are no dependencies.  This list should include
  // an previous transaction header signatures that must be applied for
  // this transaction to successfully commit.
  // For example,
  // dependencies: ['540a6803971d1880ec73a96cb97815a95d374cbad5d865925e5aa0432fcf1931539afe10310c122c5eaae15df61236079abbf4f258889359c4d175516934484a'],
  dependencies: [],
  payloadSha512: createHash('sha512').update(payloadBytes).digest('hex')
}).finish()

const txnSignature = signer.sign(transactionHeaderBytes)

const transaction = protobuf.Transaction.create({
  header: transactionHeaderBytes,
  headerSignature: txnSignature,
  payload: payloadBytes
})

const transactions = [transaction]

const batchHeaderBytes = protobuf.BatchHeader.encode({
  signerPublicKey: signer.getPublicKey().asHex(),
  transactionIds: transactions.map((txn) => txn.headerSignature),
}).finish()

const signature = signer.sign(batchHeaderBytes)

const batch = protobuf.Batch.create({
  header: batchHeaderBytes,
  headerSignature: signature,
  transactions: transactions
})

const batchListBytes = protobuf.BatchList.encode({
  batches: [batch]
}).finish()

request.post({
  url: `${address}/batches`,
})
