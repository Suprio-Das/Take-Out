const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let database

module.exports = {
    connectToServer: async () => {
        try {
            await client.connect()
            database = client.db('takeOut')
            console.log("MongoDB connected successfully")
        } catch (error) {
            console.log("Failed to connect MongoDB")
            process.exit(1)
        }
    },
    getDB: () => {
        if (!database) {
            console.log("Database not found or not connected.")
        }
        return database
    }
}