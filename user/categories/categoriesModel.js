const db = require('../../database/dbConfig.js');

module.exports = {
    addToCategory,
    getCategories,
    del
}

function addToCategory(category_data)
{
    return db('categories')
        .insert(category_data)
        .into('categories')
        .then(_=> db('categories'))
}

function getCategories(id)
{    
    return db('categories as c')
        .join('user_strains as u_s', 'u_s.id', '=', 'c.user_strain_id')
        .where(id, '=', 'u_s.user_id')
}

function del(category_id) { return db('categories').del().where({category_id}) }