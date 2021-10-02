const base64url = require('base64url')
const crypto = require('crypto')
const signatureFunction = crypto.createSign('RSA-SHA256')
const verifyFunction = crypto.createVerify('RSA-SHA256')
const fs = require('fs')

/*
    ISSUANCE
*/
const headerObj = {
    alg: 'RS256',
    typ: 'JWT'
}

const payloadObj = {
    "sub": "1234567890",
    "name": "John Doe",
    "iat": 1516239022
}

const headerObjString = JSON.stringify(headerObj)
const payloadObjString = JSON.stringify(payloadObj)

const base64UrlHeader = base64url(headerObjString)
const base64UrlPayload = base64url(payloadObjString)

signatureFunction.write(base64UrlHeader + '.' + base64UrlPayload)
signatureFunction.end()

const privateKey = fs.readFileSync(__dirname + '/id_rsa_private.pem', 'utf8')
const signatureBase64 = signatureFunction.sign(privateKey, 'base64')

const signatureBase64Url = base64url.fromBase64(signatureBase64)

console.log(signatureBase64Url)


/*
    VERIFICATION
*/

const jwt = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.ZB2hUz51rn1cQhteSILW8zvWVM1KUnAA6Tt0xwyquHx6DNtGpPcmfRxvif2kpTdLQQp8rNiYAh7zg7E57v1FKbvLOrGm2zof-T2PxZcpnfHzKNDBxi6zGNpwbvcrywjEFaCGfLmPuBdHwuhGl2B04DsakOZkMyuBLs9c15UokvWqQRjIacJM1oJLsFhtLaXZaNQNmyobHP8fo8sVHpUYFB24dU6WdYkW7F2zpD1YKQ88oxSecm1xnfAl6mT-kxIW4wDSDD5nQdSQg94BpkbXTtJDcYrP-QT-oUMw2dt9FnDEpx3ABVvm-aaqiAGjthOTGy1bQJS8z7K9W5CqBu8NCyxG9kZU0iltWIAXZ5i5Hbw5YBd3F7ZSL9TZAmbjSaq7CKUWmIyySe-zozsP_4qUK8-bm1ZW10scn90sMBzjku7Twoj8o9e0CQRPZI5J9bz4dIsb0IOdhQ4WHFofxcuD_T-9OAv_QRSEj1r4mnWGlXaah0td9Chu8C_sx-CY7ADIcJmAPMIpZdV4pcQxqbDbOQrj5BzjpfrNKOv9D8pWe4_mg21qtIAH6q9ta9zjZl8sj562W2VggP42Jnx_XSblIyn-xhS6CxMwfJj0sjcx2PacD6VmJ6hgeV4C80t3Ew4khd_Z98DVIvnEaxZtwe-rsn_AqINIljQiiUGXu5fwdic'

const [header, payload, signature] = jwt.split('.')

//const [decodedHeader, decodedPayload, decodedSignature] = jwt.split('.').map(p => base64url.decode(p))

verifyFunction.write(header + '.' + payload)
verifyFunction.end()

const jwtSignatureBase64 = base64url.toBase64(signature)

const publicKey = fs.readFileSync(__dirname + '/id_rsa_public.pem', 'utf8')

const signatureIsValid = verifyFunction.verify(publicKey, jwtSignatureBase64, 'base64')

console.log('signatureIsValid:' + signatureIsValid)