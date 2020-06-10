
exports.up = function(knex) {
    return knex.schema.createTable('calls', function (table) {
        table.increments();

        table.string('day').notNullable();
        table.string('time').notNullable();
        table.string('user').notNullable();
        table.boolean('present').notNullable();
        table.decimal('absences', 8, 1).notNullable();
        table.string('justification');

        table.foreign('user').references('user').inTable('servants');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('calls');
};
