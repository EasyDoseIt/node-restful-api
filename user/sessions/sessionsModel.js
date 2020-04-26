const db = require('../../database/dbConfig.js');

module.exports = 
{
    getUserSessions
}

function getUserSessions(user_id)
{
    return db('sessions as sesh')
        .join('user as u', 'u.id', '=', 'sesh.user_id')
        .join('strains as s', 's.id', '=', 'sesh.strain_id')
        .select('')
}