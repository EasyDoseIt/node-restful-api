const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('../auth/authRouter.js');
const userStrainRouter = require('../user/user_strains/userStrainsRouter.js');
const strainsRouter = require('../admin/strains/strainsRouter.js');
const effectsRouter = require('../user/effects/effectsRouter.js');
const sessionsRouter = require('../user/sessions/sessionsRouter.js');
const categoriesRouter = require('../user/categories/categoriesRouter.js');

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/stash', userStrainRouter);
server.use('/api/strains', strainsRouter);
server.use('/api/effects', effectsRouter);
server.use('/api/sessions', sessionsRouter);
server.use('/api/docs', express.static('./docs'));

server.get('/', (req, res) => {
    res.send('<h1>EDI backend server is running</h1>')
});

module.exports = server;