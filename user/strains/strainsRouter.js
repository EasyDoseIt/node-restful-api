const router  = require('express').Router();
const Strains = require('./strainsModel.js');
const Auth = require('../../auth/authModel.js');
const restricted = require('../../utils/restricted.js');
const cors = require('cors')

router.get('/', restricted, (req, res) =>
{
    Auth.findBy({ username: req.user.username })
    .then(response => 
        {
            Strains.getUserStrains(response[0].id)
            .then(strainRes => 
                {
                    res.status(200).json(strainRes)
                })
            .catch(err => 
                {
                    res.status(500).json({errorMessage: 'Could not retrieve strains', systemError: err})
                })
        })
})

router.post('/add', restricted, (req, res) => 
{
    Strains.addStrain(req.body)
        .then(_=> {
            res.status(201).json({ successMessage: 'New strain added to strains table', newItem: req.body })
        })
        .catch(err => 
            {
                res.status(500).json({ errorMessage: 'Could not reach database', systemError: err })
            })
})

router.delete('/del', restricted, (req, res) => 
{
    id = req.body.id
    Strains.delStrain(id)
    .then(_=> {
        res.status(200).json({successMessage: `Item of id: ${id} has been deleted`})
    })
    .catch(err => {
        res.status(500).json({ errorMessage: 'Item could note be delted', systemError: err})
    })
})

module.exports = router