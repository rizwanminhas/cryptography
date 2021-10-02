const crypto = require('crypto')
const decrypt = require('./decrypt')
const fs = require('fs')

const receivedData = require('./signMessage').packageOfDataToSend

const publicKey = fs.readFileSync(__dirname + '/id_rsa_public.pem', 'utf8')

const hash = crypto.createHash(receivedData.algorithm)

const decryptedMessage = decrypt.decryptWithPublicKey(publicKey, receivedData.signedAndEncryptedData)

const decryptedMessageHex = decryptedMessage.toString()

hash.update(JSON.stringify(receivedData.originalData))
const hashOfOriginalHex = hash.digest('hex')

if (hashOfOriginalHex === decryptedMessageHex) {
    console.log('Success! data is not tempered')
} else {
    console.log('Failed! data is tempered')
}