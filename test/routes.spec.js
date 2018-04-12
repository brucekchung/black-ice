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
        .catch(error => {
          throw error
        })
    })

    it('should not add an entry to locations if the name is missing', () => {
      return chai.request(server)
        .post('/api/v1/locations')
        .send({
          // name: 'Denver',
          lat: '41',
          long: '105W'
        })
        .then(res => {
          res.should.have.status(422)
          res.should.be.json
          res.body.should.be.a('object')
        })
    })
  })

  describe('POST /api/v1/samples/', () => {
    it('should add an entry to samples via POST', () => {
      return chai.request(server)
        .get('/api/v1/samples')
        .then(res => {
          res.should.have.status(200)
      })
        .catch(error => {
          throw error
        })
    })

    it.skip('should not add an entry to samples if the name is missing', () => {
      return chai.request(server)
        .post('/api/v1/samples')
        .send({
          // body: [{thing: 'asdf'}]
          // name: 'second',
          // date_collected: '4/21/18',
          // reflectance: 'low'
        })
        .then(res => {
          res.should.have.status(422)
          res.should.be.json
          res.body.should.be.a('object')
        })
    })
  })

  describe('DELETE /api/v1/samples/:id', () => {
    it('should delete a sample by id', () => {
      return chai.request(server)
        .delete('/api/v1/samples/1')
        .then(res => {
          res.should.have.status(200)
          res.text.should.equal('Item: 1 was successfully deleted.')
      })
        .catch(error => {
          throw error
        })
    }) 

    it.skip('should return an error when a non-existant sample id is given', () => {
      return chai.request(server)
      .delete('/api/v1/samples/999')
      .then(response => {
        response.should.have.status(500)
      })
      .catch(error => {
        throw error
      })
    })
  })

  describe('DELETE /api/v1/locations/:id', () => {
    it('should delete a location by id', () => {
      return chai.request(server)
        .delete('/api/v1/locations/1')
        .then(res => {
          res.should.have.status(200)
          res.text.should.equal('Item: 1 was successfully deleted.')
      })
        .catch(error => {
          throw error
        })
    }) 

    it.skip('should return an error when a non-existant location id is given', () => {
      return chai.request(server)
      .delete('/api/v1/locations/999')
      .then(response => {
        response.should.have.status(500)
      })
      .catch(error => {
        throw error
      })
    })
  })

  describe('PUT /api/v1/samples/:id', () => {
    it('should be able to edit a sample', () => {
      return chai.request(server)
        .put('/api/v1/samples/1')
        .send({reflectance: 'high'})
        .then(res => {
          res.should.have.status(200)
          res.text.should.equal('{"id":"1"}')
        })
        .catch(error => {
          throw error
        })
    })

    it('should give an error for an improper id', () => {
      return chai.request(server)
        .put('/api/v1/samples/999')
        .send({name: 'USA'})
        .then(res => {
          res.should.have.status(404)
          res.should.be.json
        })
    })
  })

  describe('PUT /api/v1/locations/:id', () => {
    it('should be able to edit a location', () => {
      return chai.request(server)
        .put('/api/v1/locations/1')
        .send({name: 'Denver'})
        .then(res => {
          res.should.have.status(200)
          res.text.should.equal('{"id":"1"}')
        })
        .catch(error => {
          throw error
        })
    })

    it('should give an error for an improper id', () => {
      return chai.request(server)
        .put('/api/v1/locations/999')
        .send({name: 'USA'})
        .then(res => {
          res.should.have.status(404)
          res.should.be.json
        })
    })
  })
})
