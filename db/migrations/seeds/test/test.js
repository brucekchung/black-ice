exports.seed = (knex, Promise) => {
  return knex('locations_samples').del()
    .then(() => {
      return knex('locations').del()
    })
    .then(() => {
      return knex('samples').del()
    })
    .then(() => {
      return knex('locations').insert([

      ])
    })
    .then(() => {
      return knex('samples').insert([

      ])
    })
    .then(() => {
      return knex('locations_samples').insert([

      ])
    })
}
