exports.up = function(knex) {
  return knex.schema.createTable('vehicle',function(table){
      table.increments('id').primary();
      table.string('licensePlate').notNullable();
      table.string('chassis').notNullable();
      table.string('renavam').notNullable();
      table.string('model').notNullable();
      table.string('brand').notNullable();
      table.string('year').notNullable();

  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('vehicle');
};
