const protobuf = require('sawtooth-sdk/protobuf')
const cbor = require('cbor')
const { randomBytes, createHash } = require('crypto')
const axios = require('axios')

const leafHash = (input, length) => {
  return createHash('sha512').update(input).digest('hex').toLowerCase().slice(0, length)
}

const SawtoothClientFactory = (factoryOptions) => {
  return {
    async get(url) {
      try {
        const res = await axios({
          method: 'get',
          apiUrl: factoryOptions.restApiUrl,
          url
        })
        return res
      } catch (err) {
        console.log('error', err)
      }
    },
    newTransactor(transactorOptions) {
      const _familyNamespace = transactorOptions.familyNamespace || leafHash(transactorOptions.familyName, 6)
      const _familyVersion = transactorOptions.familyVersion || '1.0'
      const _familyEncoder = transactorOptions.familyEncoder || cbor.encode
      return {
        async post(payload, txnOptions) {

          // Encode the payload
          const payloadBytes = _familyEncoder(payload)

          // Encode a transaction header
          const transactionHeaderBytes = protobuf.TransactionHeader.encode({
            familyName: transactorOptions.familyName,
            familyVersion: _familyVersion,
            inputs: [_familyNamespace],
            outputs: [_familyNamespace],
            signerPublicKey: factoryOptions.enclave.publicKey.toString('hex'),
            batcherPublicKey: factoryOptions.enclave.publicKey.toString('hex'),
            dependencies: [],
            nonce: randomBytes(32).toString('hex'),
            payloadSha512: createHash('sha512').update(payloadBytes).digest('hex'),
            ...txnOptions // overwrite above defaults with passed options
          }).finish()

          // Sign the txn header. This signature will also be the txn address
          const txnSignature = factoryOptions.enclave.sign(transactionHeaderBytes).toString('hex')

          // Create the transaction
          const transaction = protobuf.Transaction.create({
            header: transactionHeaderBytes,
            headerSignature: txnSignature,
            payload: payloadBytes
          })

          // Batch the transactions and encode a batch header
          const transactions = [transaction]
          const batchHeaderBytes = protobuf.BatchHeader.encode({
            signerPublicKey: factoryOptions.enclave.publicKey.toString('hex'),
            transactionIds: transactions.map((txn) => txn.headerSignature),
          }).finish()

          // Sign the batch header and create the batch
          const batchSignature = factoryOptions.enclave.sign(batchHeaderBytes).toString('hex')
          const batch = protobuf.Batch.create({
            header: batchHeaderBytes,
            headerSignature: batchSignature,
            transactions: transactions
          })

          // Batch the batches into a batch list
          const batchListBytes = protobuf.BatchList.encode({
            batches: [batch]
          }).finish()

          // Post the batch list
          try {
            const res = await axios({
              method: 'post',
              apiUrl: factoryOptions.restApiUrl,
              url: '/batches',
              headers: { 'Content-Type': 'application/octet-stream' },
              data: batchListBytes
            })
            return res
          } catch (err) {
            console.log('error', err)
          }
        }
      }
    }
  }
}

module.exports = {
  leafHash,
  SawtoothClientFactory
}
