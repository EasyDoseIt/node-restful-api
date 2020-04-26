const db = require('../../database/dbConfig.js');

module.exports = 
{
    getAll,
    getById,
    addStrain,
    update,
    delStrain,
}

function getAll() { return db('strains') }

function getById(id) { return db('strains').where({id}) }

function addStrain(info)
{
    return db('strains')
        .insert(info)
        .into('strains')
        .then( _=> db('strains'))
}

// TODO: Make Admin role function only
function update(id, strain_info)
{
    return db('strains')
        .where({ id })
        .update(strain_info)
        .then(_=> { db('strains').where({ id }) })
}

function delStrain(id) { return db('strains').del().where({id}) }