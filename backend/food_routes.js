const express = require('express')
const database = require('./connect')
const { ObjectId } = require('mongodb')
const food_routes = express.Router()

food_routes.route('/foods').get(async (req, res) => {
    let response = database.getDB();

    // Fetching the food items and food categories
    let data = await response.collection('food_items').find({}).toArray();
    let foodCategory = await response.collection('food_category').find({}).toArray();

    if (foodCategory.length === 0 && data.length === 0) {
        return res.status(404).json({ message: 'No data found' });
    }
    res.json({
        foodCategory,
        foodItems: data
    });
});


food_routes.route('/foods/:id').get(async (req, res) => {
    let response = database.getDB()
    let data = await response.collection('food_items').findOne({ _id: new ObjectId(req.params.id) })
    if (Object.keys(data).length > 0) {
        res.json(data)
    }
    else {
        return
    }
})

module.exports = food_routes