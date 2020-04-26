const router  = require('express').Router();
const Strains = require('./strainsModel.js');
const Auth = require('../../auth/authModel.js');
const restricted = require('../../utils/restricted.js');
const cors = require('cors')

router.get('/all_strains', restricted, (req, res) => 
{
    Strains.getAll()
    .then(response =>
        {
            res.status(200).json(response)
        })
    .catch(err =>
        {
            res.status(500).json({errorMessage: 'Could not retrieve strains', systemError: err})
        })
});

router.post('/add', restricted, (req, res) => 
{   // TODO: Error handling for existing strains
    Strains.addStrain(req.body)
    .then(_=> {
        res.status(201).json({ successMessage: 'New strain added to strains table', newItem: req.body })
    })
    .catch(err => 
        {   
            res.status(500).json({ errorMessage: 'Could not reach database', systemError: err })
        })
});

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
});

//----- Admin Access Only -----

router.put('/:strain_id', restricted, (req, res) =>
{   // TODO: Make Admin role function only and separate admin from user routes
    const strain_id = req.params.strain_id
    
    Strains.update(strain_id, req.body)
    .then(_=>
        {
            res.status(200).json({successMessage: 'Strain updated successfully', strain_updated: req.body})
        })
        .catch(err =>
            {res.status(500).json({errorMessage: 'Strain could not be updated.', systemError: err})
        })
});

module.exports = router