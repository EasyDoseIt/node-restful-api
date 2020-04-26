const router  = require('express').Router();
const Strains = require('../effects/effectsModel.js');
const Auth = require('../../auth/authModel.js');
const restricted = require('../../utils/restricted.js');
const cors = require('cors')

module.exports = router;