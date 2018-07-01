const express = require('express')

const router = express.Router()

const queries = require('../db/vault_queries.js')

router.get("/", (request, response, next) => {
    queries.list().then(vault => {
        response.json({vault})
    }).catch(next)
})

router.get("/:id", (request, response, next) => {
    queries.read(request.params.id).then(vaultItem => {
        vaultItem
            ? response.json({vaultItem})
            : response.status(404).json({message: 'Not found'})
    }).catch(next)
})
router.get("/code/:code", (request, response, next) => {
    queries.grab(request.params.code).then(vaultItem => {
        vaultItem
            ? response.json({vaultItem})
            : response.status(404).json({message: 'Not found'})
    }).catch(next)
})

router.post("/", (request, response, next) => {
    queries.create(request.body).then(vaultItem => {
        response.status(201).json({vaultItem: vaultItem})
    }).catch(next)
})

router.delete("/:id", (request, response, next) => {
    queries.delete(request.params.id).then(() => {
        response.status(204).json({deleted: true})
    }).catch(next)
})

router.put("/:id", (request, response, next) => {
    queries.update(request.params.id, request.body).then(vaultItem => {
        response.json({vaultItem: vaultItem[0]})
    }).catch(next)
})

module.exports = router