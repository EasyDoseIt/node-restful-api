const router  = require('express').Router();
const Sessions = require('../sessions/sessionsModel.js');
const Auth = require('../../auth/authModel.js');
const restricted = require('../../utils/restricted.js');

router.get('/', restricted, (req, res) =>
{
    Sessions.getUserSessions(user_id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err =>
        {
            res.status(500).json(err)
        })
})

module.exports = router;