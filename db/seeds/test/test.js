exports.seed = (knex, Promise) => {
  return knex('locations_samples').del()
    .then(() => knex('locations').del())
    .then(() => knex('samples').del())
    .then(() => {
      return knex('locations').insert([
        {
          name: 'Boulder',
          lat: '40N',
          lng: '105W',
          alt: '5430',
          region: 'Colorodo',
          country: 'United States'
        }
      ])
    })
    .then(() => {
      return knex('samples').insert([
        {
          name: 'first',
          date_collected: '4/20/18',
          reflectance: 'some value',
          wavelength: 'some value',
          locations_id: 1
        }
      ])
    })
}
