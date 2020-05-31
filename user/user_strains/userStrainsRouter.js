const router  = require('express').Router();
const Strains = require('./userStrainsModel.js');
const Auth = require('../../auth/authModel.js');
const restricted = require('../../utils/restricted.js');
const cors = require('cors')

router.get('/', restricted, (req, res) =>
{
    Auth.findBy({ username: req.user.username })
    .then(response => 
        {
            Strains.getAll(response[0].id)
            .then(strainRes => 
                {
                    res.status(200).json(strainRes)
                })
                .catch(err => 
                    {
                        res.status(500).json({errorMessage: 'Could not retrieve user strains', systemError: err})
                    })
                })
});
    
router.post('/', restricted, (req, res) =>
{   
    Strains.add(req.body)
    .then(_=>
        {
            res.status(201).json({successMessage: 'Strain added to user strains', strain_added: req.body})
        })
    .catch(err =>
        {
            res.status(500).json({errorMessage: 'Strain could not be saved', systemError: err})
        })
})

router.delete('/', restricted, (req, res) =>
{
    const id = req.body.id
    Strains.del(id)
    .then(_=>
        {
            res.status(200).json({successMessage: "Strain deleted", strainDeleted: req.body})
        })
    .catch(err =>
        {
            res.status(500).json({errorMessage: "Strain could not be deleted", systemError: err})
        })
})

module.exports = router;