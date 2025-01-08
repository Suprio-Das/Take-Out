const express = require('express')
const cors = require('cors')
const connect = require('./connect')
const PORT = 3000

const app = express()

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
    connect.connectToServer()
    console.log('Server connected successfully')
})