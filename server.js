const express = require('express');
const cors = require('cors');
const server = express();

require('dotenv').config();

server.use(cors())
server.use(express.json());

server.get('/', (req, res) => {
    res.send('<h1>EDI Backend</h1>')
});

module.exports = server;