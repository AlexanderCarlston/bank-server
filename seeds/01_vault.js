exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('vaults').del()
    .then(function () {
      // Inserts seed entries
      return knex('vaults').insert([
        {id: 1, access_code: '', vault_name: 'vault name', user_id: 1, vault_code_snippets: {"test1": ["test1"]}},
        {id: 2, access_code: '', vault_name: 'vault name2', user_id: 1, vault_code_snippets: {"test2": ["test2"]}}
      ]);
    }).then(() => {
        return knex.raw("ALTER SEQUENCE vaults_id_seq RESTART WITH 3;");
    })
}