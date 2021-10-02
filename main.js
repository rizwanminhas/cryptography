const fs = require('fs')
const encrypt = require('./encrypt')
const decrypt = require('./decrypt')

const publicKey = fs.readFileSync(__dirname + '/id_rsa_public.pem', 'utf8')
const privateKey = fs.readFileSync(__dirname + '/id_rsa_private.pem', 'utf8')

const bufferedEncryptedMessage = encrypt.encryptWithPublicKey(publicKey, 'This is a test message.')

console.log('Encryption Result:')
// will print gibberish
console.log(bufferedEncryptedMessage.toString())

bufferedDecryptedMessage = decrypt.decryptWithPrivateKey(privateKey, bufferedEncryptedMessage)

console.log('\n\nDecryption Result:')
console.log(bufferedDecryptedMessage.toString())