exports.up = function(knex, Promise) {
    return knex.schema.createTable('vaults', function(table) {
        table.increments('id')
        table.string('vault_name')
        table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .index();
        table.json('vault_code_snippets')
    })
  }
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('vaults')
  }