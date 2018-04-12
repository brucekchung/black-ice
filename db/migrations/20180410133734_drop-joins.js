
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('samples', table => {
      table.integer('locations_id').unsigned()
      table.foreign('locations_id').references('locations.id') 
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('samples', table => {
      table.dropColumn('locations_id')
    })
  ])
}
