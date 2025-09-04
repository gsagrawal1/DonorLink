const JWT = require('jsonwebtoken')

const secret_key = process.env.SECRET_KEY

function createTokenForUser(user){
    if(!secret_key) throw new Error("Secret key is missing!")
        console.log(secret_key)
    const payload = {
        _id : user._id,
        email : user.email,
        role : user.role
    }
    const token = JWT.sign(payload, secret_key, {expiresIn : "1d"})
    return token
}

function validateToken(token) {
    const payload = JWT.verify(token, secret_key)
    return payload
}

module.exports = {
    createTokenForUser,
    validateToken
}