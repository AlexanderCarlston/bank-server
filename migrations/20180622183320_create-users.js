exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
      table.increments('id')
      table.string('github_token')
      table.string('github_name')
      table.string('avatar_url')
      table.json('user_code_snippets')
    })
  }
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users')
  }