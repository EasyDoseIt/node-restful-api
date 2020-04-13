const db = require('../../database/dbConfig.js');

module.exports = 
{
    getUserStrains,
    findById,
    getUserStrainEffects,
    addStrain,
    delStrain
}

function getUserStrains(user_id)
{
    return db('strains as s')
        .join('users as u', 'u.id', '=', 's.user_id')
        .join('effects as e', 'e.strain_id', '=', 's.id')
        .select('s.strain_name', 's.strain_type', 's.image', 's.product_type', 's.image' )
        .where({ 'u.id': user_id })
}

function findById(id) { return db('strains').where({id}) }


function getUserStrainEffects(strain_id)
{
    return db('effects as e')
        .join('strains as s', 's.id', '=', 'e.strain_id')
        .where({ 's.id': strain_id })
}

function addStrain(info)
{
    return db('strains')
        .insert(info)
        .into('strains')
        .then( _=> db('strains'))
}

function delStrain(id)
{
    return db('strains')
        .del()
        .where({id})
}