const express = require('express')
const cors = require('cors')
const connect = require('./connect')
const PORT = 3000
const food_items_routes = require('./food_items_routes')
const UserRoutes = require('./User')

const app = express()

app.use(cors())
app.use(express.json())
app.use(food_items_routes)
app.use(UserRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    connect.connectToServer()
    console.log('Server connected successfully')
})