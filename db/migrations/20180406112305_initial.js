exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('locations', table => {
      table.increments('id').primary()
      table.string('name')
      table.number('lat')
      table.number('lng')
      table.number('alt')
      table.string('region')
      table.string('country')

      table.timestamps(true, true)
    }),

    knex.schema.createTable('samples', table => {
      table.increments('id').primary()
      table.string('name')
      table.string('date_collected')
      table.string('reflectance')
      table.string('wavelength')

      table.timestamps(true, true)
    }),

    knex.schema.createTable('locations_samples', table => {
        table.increments('id').primary()
        table.integer('locations_id').references('locations.id')
        table.integer('samples_id').references('samples.id')
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('locations_samples'),
    knex.schema.dropTable('locations')
    knex.schema.dropTable('samples')
  ])
}
