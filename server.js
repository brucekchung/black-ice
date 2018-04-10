const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)
const path = require('path')

server.set('port', process.env.PORT || 5000)

server.use(bodyParser.json())

server.use(express.static(path.join(__dirname, 'client/build')))

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

server.delete('/api/v1/samples/:id', (req, res) => {
  database('samples').where('id', req.params.id)
    .select()
    .del()
    .then(item => {
      if(!item.length) {
        res.status(200).send('deleted')
      } else {
        res.status(404).send('error deleting')
      }
    })
    .catch(error => res.status(500).json({error}))
})

server.delete('/api/v1/locations/:id', (req, res) => {
  database('locations').where('id', req.params.id)
    .select()
    .del()
    .then(item => {
      if(!item.length) {
        res.status(200).send('deleted')
      } else {
        res.status(404).send('error deleting')
      }
    })
    .catch(error => res.status(500).json({error}))
})

module.exports = server
