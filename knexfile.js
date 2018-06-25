module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/code-bank'
  },
  test: {},
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
