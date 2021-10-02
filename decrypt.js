const crypto = require('crypto')

// protect data but not identity
function decryptWithPrivateKey(privateKey, encryptedMessage) {
    return crypto.privateDecrypt(privateKey, encryptedMessage)
}

module.exports = { decryptWithPrivateKey }