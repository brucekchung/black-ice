const express = require('express')
const server = express()
const bodyParser = require('body-parser')


server.set('port', process.env.PORT || 3000)

server.use(bodyParser.json())

server.listen(server.get('port'), () => {
  console.log(`listening on ${server.get('port')}`)
})


module.exports = server
