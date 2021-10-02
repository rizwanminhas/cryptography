const crypto = require('crypto')
const fs = require('fs')

function genKeyPair() {
    return crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    })
}

const keyPair = genKeyPair()

fs.writeFileSync(__dirname + '/id_rsa_public.pem', keyPair.publicKey)
fs.writeFileSync(__dirname + '/id_rsa_private.pem', keyPair.privateKey)