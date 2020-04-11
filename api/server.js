const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('../auth/authRouter.js');


const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use('/api/auth', authRouter)
server.use('/api/docs', express.static('./docs'))

server.get('/', (req, res) => {
    res.send('<h1>EDI backend server is running</h1>')
});

module.exports = server;