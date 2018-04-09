const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

server.set('port', process.env.PORT || 5000)

server.use(bodyParser.json())

server.listen(server.get('port'), () => {
  console.log(`listening on ${server.get('port')}`)
})

server.get('/api/v1/locations/', (req, res) => {
  res.status(200).send('works')
})

server.post('/api/v1/locations/', (req, res) => {
  const { name } = req.body

  if (!name) {
    return res
      .status(422)
      .json('missing parameter')
  }

  database('locations').insert(req.body, 'id')
    .then(item => res.status(200).json({ id: item[0], name}))
    .catch(error => res.status(500).json({error}))
})

server.post('/api/v1/samples/', (req, res) => {
  const { name } = req.body

  if (!name) {
    return res
      .status(422)
      .json('missing parameter')
  }

  database('samples').insert(req.body, 'id')
    .then(item => res.status(200).json({ id: item[0], name}))
    .catch(error => res.status(500).json({error}))
})


module.exports = server
