const db = require('../../database/dbConfig.js');

module.exports = 
{
    getAll,
    getById,
    add,
    del
}

function getAll(user_id)
{   
    return db('user_strains as u_s')
        .join('strains as s', 's.id', '=', 'u_s.strain_id')
        // .join('effects as e', 'e.user_strain_id', '=', 'u_s.id') user_strain_id is limiting returned results to only those strains whose ids are in effects
        // .select('s.strain_name', 's.strain_type', 's.image', 's.product_type', 's.image', 'e.feeling', 'e.negative_effect', 'e.user_strain_id' )
        .where({ 'u_s.user_id': user_id })
}

function getById(id)
{
    return db('user_strains as u_s')
        .join('effects as e', 'e.user_strain_id', '=', 'u_s.id')
        .join('strains as s', 's.id', '=', 'u_s.strain_id')
        .select('s.strain_name', 's.strain_type', 's.product_type', 's.image', 'e.feeling', 'e.negative_effect' )
        .where({ 'u_s.user_id': id })
}

function add(user_strain)
{
    return db('user_strains as u_s')
        .insert(user_strain)
        .into('user_strains')
        .then(_=> db('strains'))
}

function del(strain_id) { return db('user_strains').del().where({strain_id}) }