const input = {
  payloadIsValid: (payload) => {
    if (valueIsValid(payload.Value) && verbIsValid(payload.Verb) && nameIsValid(payload.Name)) return true
    else return false
  },
  submitPayload: async (payload, transactor) => {
    try {
      // Format the Sawtooth transaction
      const txn = payload
      console.log(`Submitting report transaction to Sawtooth REST API`)
      // Wait for the response from the validator receiving the transaction
      const txnRes = await transactor.post(txn)
      // Log only a few key items from the response, because it's a lot of info
      console.log({
        status: txnRes.status,
        statusText: txnRes.statusText
      })
      return txnRes
    } catch (err) {
      console.log('Error submitting transaction to Sawtooth REST API: ', err)
      console.log('Transaction: ', txn)
    }
  }
}

const isInteger = (value) => {
  if (isNaN(value)) {
    return false
  }
  var x = parseFloat(value)
  return (x | 0) === x
}

const verbIsValid = (verb) => {
  const trimmed = verb.trim()
  if (trimmed === 'inc' || trimmed === 'dec' || trimmed === 'set') return true
  else return false
}

const nameIsValid = (name) => {
  if (name.toString().length <= 20) return true
  else return false
}

const valueIsValid = (value) => {
  if ((isInteger(value)) && (value >= 0) && (value < Math.pow(2, 32) - 1)) return true
  else return false
}

module.exports = input
