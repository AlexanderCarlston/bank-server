exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, github_token: 'github token', github_name: 'github name', avatar_url:'testurl', user_code_snippets: {"test1": ["test1"]}},
        {id: 2, github_token: 'github token2', github_name: 'github name2', avatar_url:'testurl', user_code_snippets: {"test2": ["test2"]}}
      ]);
    }).then(() => {
        return knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 3;");
    })
}