
exports.up = function(knex) {
    return knex.schema.createTable('calls', function (table) {
        table.increments();

        table.date('day').notNullable();
        table.time('time').notNullable();
        table.string('user').notNullable();
        table.boolean('absences').notNullable();
        table.string('justification');

        table.foreign('user').references('user').inTable('servants');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('calls');
};
