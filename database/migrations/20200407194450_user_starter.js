
exports.up = function(knex) {
    return knex.schema
    .createTable('users', tbl => 
    {
        tbl.increments()
        tbl.string('username', 255).notNullable().unique()
        tbl.string('password', 255).notNullable()
        tbl.string('email', 180).notNullable().unique()
        tbl.string('name', 255)        
    })

    .createTable('strains', tbl => 
    {
        tbl.increments()
        tbl.string('strain_name', 255).notNullable()
        tbl.string('strain_type')
        tbl.string('product_type')
        tbl.binary('image')      
        tbl.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
    })
    .createTable('effects', tbl => 
    {   
        tbl.string('feeling', 180)
        tbl.boolean('negative_effect').defaultTo(false)
        tbl.integer('strain_id').unsigned().references('id').inTable('strains').onDelete('CASCADE').onUpdate('CASCADE')
    })
    .createTable('favorite_strains', tbl => 
    {
        tbl.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
        tbl.integer('strain_id').unsigned().references('id').inTable('strains').onDelete('CASCADE').onUpdate('CASCADE')
    })
    .createTable('sessions', tbl =>
    {
        tbl.increments()
        tbl.string('session_name', 255)
        tbl.date('session_date')
        tbl.float('dose_size', [6, 3])
        tbl.string('dose_type')
        tbl.string('notes', 10000)
        tbl.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')  
        tbl.integer('strain_id').unsigned().references('id').inTable('strains').onDelete('CASCADE').onUpdate('CASCADE')  
    })
    .createTable('categories', tbl => 
    {
        tbl.increments()
        tbl.string('category_name')
        tbl.integer('strain_id').unsigned().references('id').inTable('strains').onDelete('CASCADE').onUpdate('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('strains')
        .dropTableIfExists('sessions')
};
