const database = require("./knex.js");

module.exports = {
    list(){
      return database('vaults')
    },
    read(id){
      return database('vaults').select().where('id', id).first()
    },
    create(item){
      return database('vaults')
      .insert(item)
      .returning('*')
      .then(record => record[0])
    },
    update(id, item){
      return database('vaults')
     .update(item)
     .where("id", id)
     .returning("*")
     .then(item => item[0])
    },
    delete(id){
      return database('vaults').delete().where('id', id)
    },
    user_vault(id){
      return database('vaults').select().where('user_id', id)
    },
    grab(code){
      return database('vaults').select().where('access_code', code).first()
    }
};
