const crypto = require('crypto')

// protect data but not identity
function encryptWithPublicKey(publicKey, message) {
    const bufferMessage = Buffer.from(message, 'utf8')
    return crypto.publicEncrypt(publicKey, bufferMessage)
}

// for data signature
function encryptWithPrivateKey(privateKey, message) {
    const bufferMessage = Buffer.from(message, 'utf8')
    return crypto.privateEncrypt(privateKey, bufferMessage)
}

module.exports = { encryptWithPublicKey, encryptWithPrivateKey }