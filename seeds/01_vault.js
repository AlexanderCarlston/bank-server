exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('vaults').del()
    .then(function () {
      // Inserts seed entries
      return knex('vaults').insert([
        {id: 1, vault_name: 'vault name', user_id: 1},
        {id: 2, vault_name: 'vault name2', user_id: 1}
      ]);
    }).then(() => {
        return knex.raw("ALTER SEQUENCE vaults_id_seq RESTART WITH 3;");
    })
}