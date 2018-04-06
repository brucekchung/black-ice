module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/blackice',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
}
