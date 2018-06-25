const express = require('express')

const router = express.Router()

const queries = require('../db/vault_queries.js')

router.get("/", (request, response, next) => {
    queries.list().then(user => {
        response.json({user})
    }).catch(next)
})

router.get("/:id", (request, response, next) => {
    queries.read(request.params.id).then(userItem => {
        userItem
            ? response.json({userItem})
            : response.status(404).json({message: 'Not found'})
    }).catch(next)
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