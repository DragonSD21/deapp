//npx knex migrate:latest
exports.up = function(knex) {
    return knex.schema.createTable('servants', function (table) {
        // table.increments('id');
        // table.string('user').notNullable();
        table.string('user').primary();
        table.string('password').notNullable();
        table.boolean('passwordTemporary').notNullable();
        table.string('name').notNullable();
        table.string('type').notNullable();
        table.string('ministry').notNullable();
        table.decimal('absences').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('servants');
};
