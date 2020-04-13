const jwt = require('jsonwebtoken');
const secret = require('../config/secret.js');

module.exports = (req, res, next) =>
{
    const token = req.headers.authorization
    if (token)
    {
        jwt.verify(token, secret.jwtSecret, (err, decodedToken) => 
        {
            if (err)
            {
                res.status(401).json({ errorMessage: 'Invalid Credentials', systemError: err })
            }
            else
            {
                req.user = { username: decodedToken.username }
                next()
            }
        })
    }
}