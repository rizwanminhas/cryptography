const crypto = require('crypto')
const hash = crypto.createHash('sha256')
const fs = require('fs')
const encrypt = require('./encrypt')

// Data signing is used for authenticity of data, it is not used for data protection.

const data = {
    firstname: 'rizwan',
    lastname: 'minhas'
}

const dataAsString = JSON.stringify(data)

hash.update(dataAsString)

const hashedData = hash.digest('hex')

const senderPrivateKey = fs.readFileSync(__dirname + '/id_rsa_private.pem', 'utf8')

const signedMessage = encrypt.encryptWithPrivateKey(senderPrivateKey, hashedData)

const packageOfDataToSend = {
    algorithm: 'sha256',
    originalData: data,
    signedAndEncryptedData: signedMessage
}

module.exports = { packageOfDataToSend }