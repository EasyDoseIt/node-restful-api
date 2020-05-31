const router  = require('express').Router();
const Sessions = require('../sessions/sessionsModel.js');
const Auth = require('../../auth/authModel.js');
const restricted = require('../../utils/restricted.js');

router.get('/', restricted, (req, res) =>
{
    Auth.findBy({ username: req.user.username })
    .then(response=>
        {
            Sessions.getUserSessions(response[0].id)
            .then(sessionsRes => {
                res.status(200).json(sessionsRes)
            })
            .catch(err =>
                {
                    res.status(500).json({errorMessage: 'Could not retrieve user sessions', systemError: err})
                })

        })
})

router.get('/:session_id', restricted, (req, res) =>
{
    const sesh = req.params.session_id
    const user = req.body.user_id

    Sessions.getSessionById(user, sesh)
    .then(session =>
        {
            if (session.length === 0)
            {
                res.status(200).json({Message: "No session with that id found"})
            } else 
            {
                res.status(200).json({successMessage: `Session with id: ${sesh} retrieved`,retrievedSession:session})
            }
        })
    .catch(err => 
        {
            res.status(500).json({errorMessage: `Could not retrieve user session of id: ${sesh}`, systemError: err})
        })
})

router.post('/', restricted, (req, res) =>
{
    const sesh = req.body

    Sessions.addUserSession(sesh)
    .then(session =>
        {
            res.status(200).json({successMessage: "Session successfully created", createdSession: session})
        })
    .catch(err =>
        {
            res.status(500).json({errorMessage: "Session could not be created. Try again.", systemError: err})
        })
})

router.put('/:session_id', restricted, (req, res) =>
{
    const sesh_id = req.params.session_id
    const sesh_changes = req.body

    Sessions.updateSession(sesh_id, sesh_changes)
    .then(session =>
        {
            res.status(200).json({successMessage: "Session successfully updated", updatedSession: session})
        })
    .catch(err =>
        {
            res.status(500).json({errorMessage: `Session of id ${sesh_id} could not be updated`, systemError: err})
        })
})

router.delete('/', restricted, (req, res) =>
{
    const sesh_id = req.body.id

    Sessions.deleteSession(sesh_id)
    .then(session =>
        {
            res.status(200).json({successMessage: `Session of id ${sesh_id} deleted`, deletedSession: session})
        })
    .catch(err =>
        {
            res.status(500).json({errorMessage: "Session could not be deleted", systemError: err})
        })
})

module.exports = router;