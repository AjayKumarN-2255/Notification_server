const jwt = require('jsonwebtoken');


function generateToken(payload, type = "access") {

    if (type === "access") {
        const access_token_secret = process.env.access_token_secret;
        return jwt.sign(payload, access_token_secret, { expiresIn: '30m' });
    } else if (type === "refresh") {
        const refresh_token_secret = process.env.refresh_token_secret;
        return jwt.sign(payload, refresh_token_secret, { expiresIn: '7d' });
    } else {
        throw new Error('Invalid token type');
    }

}

function verifyToken(token, type) {
    try {
        const secret = type === 'access' ? process.env.access_token_secret : process.env.refresh_token_secret;
        return jwt.verify(token, secret);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    generateToken,
    verifyToken
}