import { MongoClient } from "mongodb"

let dbConnection;

const connection = {
    connectToDb: (callback) => {
        MongoClient.connect('mongodb://localhost:27017/ucek')
            .then(client => {
                dbConnection = client.db()
                return callback()
            })
            .catch(error => {
                console.error(error)
                return callback(error)
            })
    },
    getDb: () => dbConnection
}

export default connection
