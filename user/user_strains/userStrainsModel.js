const db = require('../../database/dbConfig.js');

module.exports = 
{
    getAll,
    getById,
    add,
    del
}

function getAll(user_id)
{   // TODO: add strain effects
    return db('user_strains as u_s')
        .join('strains as s', 's.id', '=', 'u_s.strain_id')
        .select('s.strain_name', 's.strain_type', 's.image', 's.product_type', 's.image' )
        .where({ 'u_s.user_id': user_id })
}

function getById(id) { return db('user_strains').where({id}) }

function getUserStrainEffects(strain_id)
{ // TODO: Handle effects requests
    return db('effects as e')
        .join('strains as s', 's.id', '=', 'e.strain_id')
        .where({ 's.id': strain_id })
}

function add(user_strain)
{
    return db('user_strains as u_s')
        .insert(user_strain)
        .into('user_strains')
        .then(_=> db('strains'))
}

function del(strain_id) { return db('user_strains').del().where({strain_id}) }