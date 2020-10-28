const router  = require('express').Router();
const Categories  = require('../categories/categoriesModel.js');
const Auth = require('../../auth/authModel.js');
const restricted = require('../../utils/restricted.js');
const cors = require('cors');

router.get('/', restricted, (req, res) =>
{
    Auth.findBy({ username: req.user.username })
    .then(response => 
        {   
            console.log(response[0])
            Categories.getCategories(response[0].id)
            .then(categoriesRes => 
                {
                    res.status(200).json(categoriesRes)
                })
            .catch(err => 
                {
                    res.status(500).json({errorMessage: 'Could not retrieve user categories', systemError: err})
                })
        })
});

router.post('/', restricted, (req, res) =>
{
    Categories.addToCategory(req.body)
    .then(_=>
        {
            res.status(201).json({successMessage: 'Strain added to category', newAddition: req.body})
        })
    .catch(err =>
        {
            res.status(500).json({errorMessage: 'Change could not be saved', systemError: err})
        })
})

module.exports = router;