process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')
const environment = 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

chai.use(chaiHttp)

describe('Client Routes', () => {
  it('should return the homepage with text', () => {
    return chai.request(server)
      .get('/')
      .then(response => {
        // response.should.have.status(200)
        response.should.be.html
      })
      .catch(error => {
        throw error
      })
  })

  it('should return a 404 if page does not exist', () => {
    return chai.request(server)
      .get('/PANTS')
      .then(response => {
        response.should.have.status(404)
      })
      .catch(error => {
        throw error
      })
  })
})

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

  describe('GET /api/v1/locations/', () => {
    it('should get all the locations', () => {
      return chai.request(server)
        .get('/api/v1/locations')
        .then(res => {
          res.should.have.status(200)
          res.body.length.should.equal(1)
          res.should.be.json
          res.body.should.be.a('array')
          res.body[0].should.have.property('name')
          res.body[0].name.should.equal('Boulder')
          res.body[0].should.have.property('lat')
          res.body[0].lat.should.equal('40N')
          res.body[0].should.have.property('lng')
          res.body[0].lng.should.equal('105W')
          res.body[0].should.have.property('alt')
          res.body[0].alt.should.equal('5430')
          res.body[0].should.have.property('region')
          res.body[0].region.should.equal('Colorodo')
          res.body[0].should.have.property('country')
          res.body[0].country.should.equal('United States')
        })
        .catch(error => {
          throw error
        })
    })

    it('should get all locations at custom query params', () => {
      return chai.request(server)
        .get('/api/v1/locations?name=Boulder')
        .then(res => {
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('array')
          res.body[0].should.have.property('name')
          res.body[0].name.should.equal('Boulder')
          res.body[0].should.have.property('lat')
          res.body[0].lat.should.equal('40N')
          res.body[0].should.have.property('lng')
          res.body[0].lng.should.equal('105W')
          res.body[0].should.have.property('alt')
          res.body[0].alt.should.equal('5430')
          res.body[0].should.have.property('region')
          res.body[0].region.should.equal('Colorodo')
          res.body[0].should.have.property('country')
          res.body[0].country.should.equal('United States')
        })
        .catch(err => {
          throw err
        })
    })

    it('should return a 404 if location at custom query params does not exist', () => {
      return chai.request(server)
        .get('/api/v1/locations?name=WRONG')
        .then(res => {
          res.should.have.status(404)
          res.body.should.be.a('object')
          res.body.should.have.property('error')
          res.body.error.should.equal('Could not find locations at that custom query')
        })
    })
  })

  describe('POST /api/v1/locations/', () => {
    it('should add an entry to locations via POST', () => {
      return chai.request(server)
        .post('/api/v1/locations')
        .send({
          name: "PLACE",
          lat: "40N",
          lng: "105W",
          alt: "5430",
          region: "Colorodo",
          country: "United States"
        })
        .then(res => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('id')
          res.body.id.should.equal(2)
          res.body.should.have.property('name')
          res.body.name.should.equal('PLACE')
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
          res.body.should.have.property('error')
          res.body.error.should.equal('The request body is missing a name parameter')
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
          res.body.should.be.a('object')
          res.body.should.have.property('id')
          res.body.id.should.equal('1')
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
          res.body.should.be.a('object')
          res.body.should.have.property('error')
          res.body.error.should.equal('Could not find location with id: 999')
        })
    })
  })

  describe('DELETE /api/v1/locations/:id', () => {
    it('should delete a location by id', () => {
      return chai.request(server)
        .delete('/api/v1/locations/1')
        .then(res => {
          res.should.have.status(200)
          res.should.be.json
      })
        .catch(error => {
          throw error
        })
    }) 

    it('should return an error when a non-existant location id is given', () => {
      return chai.request(server)
        .delete('/api/v1/locations/999')
        .then(res => {
          res.should.have.status(404)
          res.body.should.be.a('object')
          res.body.should.have.property('error')
          res.body.error.should.equal('Could not find location with id: 999')
        })
        .catch(error => {
          throw error
        })
    })
  })

  describe('GET /api/v1/samples/', () => {
    it('should get all the samples', () => {
      return chai.request(server)
        .get('/api/v1/samples')
        .then(res => {
          res.should.have.status(200)
          res.body.length.should.equal(1)
          res.should.be.json
          res.body.should.be.a('array')
          res.body[0].should.have.property('name')
          res.body[0].name.should.equal('first')
          res.body[0].should.have.property('date_collected')
          res.body[0].date_collected.should.equal('4/20/18')
          res.body[0].should.have.property('reflectance')
          res.body[0].reflectance.should.equal('some value')
          res.body[0].should.have.property('wavelength')
          res.body[0].wavelength.should.equal('some value')
          res.body[0].should.have.property('locations_id')
          res.body[0].locations_id.should.equal(1)
        })
        .catch(error => {
          throw error
        })
    })

    it('should get all samples at custom query params', () => {
      return chai.request(server)
        .get('/api/v1/samples?startDate=4/10/18&endDate=4/30/18&locations_id=1')
        .then(res => {
          res.should.have.status(200)
          res.should.be.json
          res.body.should.be.a('array')
          res.body[0].should.have.property('name')
          res.body[0].name.should.equal('first')
          res.body[0].should.have.property('date_collected')
          res.body[0].date_collected.should.equal('4/20/18')
          res.body[0].should.have.property('reflectance')
          res.body[0].reflectance.should.equal('some value')
          res.body[0].should.have.property('wavelength')
          res.body[0].wavelength.should.equal('some value')
          res.body[0].should.have.property('locations_id')
          res.body[0].locations_id.should.equal(1)
        })
        .catch(err => {
          throw err
        })
    })

    it('should return a 404 if location at custom query params does not exist', () => {
      return chai.request(server)
        .get('/api/v1/samples?startDate=wrong&endDate=wrong&locations_id=999')
        .then(res => {
          res.should.have.status(404)
          res.body.should.be.a('object')
          res.body.should.have.property('error')
          res.body.error.should.equal('Could not find samples collected between wrong and wrong for that location')
        })
    })
  })

  describe('POST /api/v1/samples/', () => {
    it('should add an entry to samples via POST', () => {
      return chai.request(server)
        .post('/api/v1/samples')
        .send([{
          name: 'second',
          date_collected: '4/21/18',
          reflectance: 'low',
          wavelength: 'xyz'
        }])
        .then(res => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('message')
          res.body.message.should.equal('Samples inserted')
        })
        .catch(error => {
          throw error
        })
    })

    it('should not add an entry to samples if the name is missing', () => {
      return chai.request(server)
        .post('/api/v1/samples')
        .send([{
          // name: 'second',
          date_collected: '4/21/18',
          reflectance: 'low',
          wavelength: 'xyz'
        }])
        .then(res => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('error')
          res.body.error.should.equal('Item at index: 0 is missing a name parameter')
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
          res.body.should.be.a('object')
          res.body.should.have.property('id')
          res.body.id.should.equal('1')
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
          res.body.should.be.a('object')
          res.body.should.have.property('error')
          res.body.error.should.equal('Could not find sample with id: 999')
        })
    })
  })

  describe('DELETE /api/v1/samples/:id', () => {
    it('should delete a sample by id', () => {
      return chai.request(server)
        .delete('/api/v1/samples/1')
        .then(res => {
          res.should.have.status(200)
          res.should.be.json
          res.should.be.a('object')
        })
        .catch(error => {
          throw error
        })
    }) 

    it('should return an error when a non-existant sample id is given', () => {
      return chai.request(server)
      .delete('/api/v1/samples/999')
      .then(res => {
        res.should.have.status(404)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
      })
    })
  })

})
