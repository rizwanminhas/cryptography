const jwt = require('jsonwebtoken')
const fs = require('fs')

const privateKey = fs.readFileSync(__dirname + '/id_rsa_private.pem', 'utf8')
const publicKey = fs.readFileSync(__dirname + '/id_rsa_public.pem', 'utf8')

const payloadObj = {
    "sub": "1234567890",
    "name": "John Doe",
    "iat": 1516239022
}

const signedJWT = jwt.sign(payloadObj, privateKey, { algorithm: 'RS256' })

console.log(signedJWT)

jwt.verify(signedJWT, publicKey, { algorithms: ['RS256'] }, (err, payload) => {
    console.log(err)
    console.log(payload)
})