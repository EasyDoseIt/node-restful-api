const db = require('../database/dbConfig')

module.exports = 
{
    findById,
    findBy,
    add,
}

function findById(id) { return db('users').where({id}) }

function findBy(filter) { return db('users').where(filter) }

async function add(user)
{
    const [id] = await db('users').insert(user, 'id')
    return findById(id)
}