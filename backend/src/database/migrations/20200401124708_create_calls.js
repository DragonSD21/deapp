
exports.up = function(knex) {
    return knex.schema.createTable('calls', function (table) {
        table.increments();

        table.date('day').notNullable();
        table.time('time').notNullable();
        table.boolean('absence').notNullable();
        table.string('justification');

        table.string('servant_id').notNullable();

        table.foreign('servant_id').references('id').inTable('servants');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('calls');
};
