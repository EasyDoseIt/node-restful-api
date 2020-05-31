const db = require('../../database/dbConfig.js');

module.exports = 
{
    getUserSessions,
    getSessionById,
    addUserSession,
    updateSession,
    deleteSession
}

function getUserSessions(user_id)
{
    return db('sessions as sesh')
        .join('users as u', 'u.id', '=', 'sesh.user_id')
        .join('strains as s', 's.id', '=', 'sesh.strain_id')
        .where({user_id})
}

function getSessionById(user_id, session_id)
{
    return db('sessions as sesh')
        .join('users as u', 'u.id', '=', 'sesh.user_id')
        .join('strains as s', 's.id', '=', 'sesh.strain_id')
        .where({user_id})
        .andWhere({'sesh.id': session_id})
}

function addUserSession(session_info)
{
    return db('sessions')
        .insert(session_info)
        .into('sessions')
        .then(_=> db('sessions'))
}

function updateSession(id, session_changes)
{
    return db('sessions')
        .where({ id })
        .update(session_changes)
        .then(_=> { return db('sessions').where('sessions.id', '=', id) })
}

function deleteSession(id) {  return db('sessions').del().where({id}) }
