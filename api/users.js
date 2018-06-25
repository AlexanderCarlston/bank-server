const express = require('express')
const router = express.Router()
const queries = require('../db/user_queries.js')
const knex = require('../db/knex')
const vault_queries = require('../db/vault_queries.js')

router.get("/", (request, response, next) => {
    queries.list().then(users => {
        response.json({users})
    }).catch(next)
})

router.get("/:id", (request, response, next) => {
    queries.read(request.params.id).then(userItem => {
        userItem
            ? response.json({userItem})
            : response.status(404).json({message: 'Not found'})
    }).catch(next)
})

router.get('/:id/vaults', (request, response, next) => {
    vault_queries.user_vault(request.params.id).then(vaults => {
        vaults
            ? response.json({vaults})
            : response.status(404).json({message: 'Not found'})
    })
})

router.post("/", (request, response, next) => {
    queries.create(request.body).then(userItem => {
        response.status(201).json({userItem: userItem})
    }).catch(next)
})

router.delete("/:id", (request, response, next) => {
    queries.delete(request.params.id).then(() => {
        response.status(204).json({deleted: true})
    }).catch(next)
})

router.put("/:id", (request, response, next) => {
    queries.update(request.params.id, request.body).then(userItem => {
        response.json({userItem: userItem[0]})
    }).catch(next)
})

module.exports = router