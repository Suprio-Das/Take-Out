const express = require('express')
const database = require('./connect')
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

module.exports = food_items_routes