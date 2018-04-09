process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')
const environment = 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

chai.use(chaiHttp)

describe('API Routes', () => {

  beforeEach((done) => {
    database.migrate.rollback()
    .then(() => {
      database.migrate.latest()
      .then(() => {
        return database.seed.run()
        .then(() => {
          done()
        })
      })
    })
  })

  describe('POST /api/v1/locations/', () => {
    it('should add an entry to locations via POST', () => {
      return chai.request(server)
        .get('/api/v1/locations')
        .then(res => {
          res.should.have.status(200)
      })
    })
  })
})
