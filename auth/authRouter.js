const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('./authModel.js');
const cors = require('cors');
const duplicateUser = require('../utils/duplicateUser.js');
const duplicateEmail = require('../utils/duplicateEmail.js');
const saltRounds = require('../utils/saltRounds.js');

router.use(cors());

router.post('/register', duplicateUser, duplicateEmail, (req, res) =>
{
    if (!req.body.username || !req.body.password)
    {
        res.status(400).json({ errorMessage: "Missing username or password" })
    }
    else
    {
        let { username, password, email, name } = req.body
        bcrypt.genSalt(saltRounds, function(_err, salt)
        {
            bcrypt.hash(password, salt, function(_err, hash)
            {
                Users.add({  username, password: hash, email, name: name || '' })
                    .then(_=>
                        {   
                            Users.findBy({ username }).first()
                            .then(user =>
                                {                                
                                    bcrypt.compare(password, user.password, function(_err, response)
                                    {
                                        if (response)
                                        {
                                            const token = generateToken(user)
                                            res.status(201).json({ id: user.id, username: user.username, token:token, name: user.name })
                                        }
                                        else res.status(401).json({ errorMessage: 'Invalid Credentials' })
                                    })
                                })
                                .catch(err => 
                                {
                                    res.status(500).json({ errorMessage: 'Internal Error: Could not retrieve users', systemError: err })
                                })
                        })
                    .catch(err =>
                        {
                            res.status(500).json({ errorMessage: `Internal Error: Could not register user`, systemError: err })
                        })
            })
        })
    }
})

router.post('/login', (req, res) => 
{   
    if (!req.body.username || !req.body.password)
    {
        res.status(400).json({ errorMessage: 'Missing username or password' })
    }
    else
    {
        let { username, password } = req.body
        Users.findBy({ username }).first()
            .then(user => 
                {
                    bcrypt.compare(password, user.password, function(err, response)
                    {
                        if (response)
                        {                        
                            const token = generateToken(user) 
                            res.status(200).json({ token })                            
                        
                        }
                        else
                        {
                            res.status(401).json({ errorMessage: 'Invalid Credentials' })
                        }
                    })
                })
            .catch(err => 
                {
                    res.status(500).json({ errorMessage: 'Internal Error: Could not log in', systemError: err })
                })
    }
})

function generateToken(user)
{
    const payload = { username: user.username }
    const secret = require('../config/secret').jwtSecret
    const options = { expiresIn: '1d' }

    return jwt.sign(payload, secret, options)
}

module.exports = router