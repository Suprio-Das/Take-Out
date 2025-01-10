const express = require('express')
const database = require('./connect')
const { ObjectId } = require('mongodb')
const food_items_routes = express.Router()

food_items_routes.route('/foods').get(async (req, res) => {
    let response = database.getDB()
    let data = await response.collection('food_items').find({}).toArray()

    if (data.length > 0) {
        res.json(data)
    }
    else {
        return
    }
})

food_items_routes.route('/foods/:id').get(async (req, res) => {
    let response = database.getDB()
    let data = await response.collection('food_items').findOne({ _id: new ObjectId(req.params.id) })
    if (Object.keys(data).length > 0) {
        res.json(data)
    }
    else {
        return
    }
})

module.exports = food_items_routes