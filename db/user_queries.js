const database = require('./knex.js');

module.exports = {
  list() {
    return database('users');
  },
  read(id) {
    return database('users').select().where('id', id).first();
  },
  create(item) {
    return database('users')
      .insert(item)
      .returning('*')
      .then((record) => record[0]);
  },
  update(id, item) {
    return database('users')
      .update(item)
      .where('id', id)
      .returning('*')
      // eslint-disable-next-line no-shadow
      .then((item) => item[0]);
  },
  delete(id) {
    return database('users').delete().where('id', id);
  },
};
