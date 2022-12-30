import cors from "cors"
import connection from "./models/dbConnection.js"
import express from "express"

let _db = null
const app = express()
const PORT = 3000

connection.connectToDb(err => {
    if (err)
        return
    app.listen(
        PORT,
        () => {
            console.log(`Server running on http://localhost:${PORT}/`)
        }
    )
    _db = connection.getDb()
})

app.get('/login', async (req, res) => {
    let { roll, pass } = req.query
    let result = await _db.collection('students')
        .findOne({ roll: roll, password: pass })
    delete result.password
    res.status(200).json(result)
})

app.post('/register', express.json(), async (req, res) => {
    // let result = await _db.collection('students')
    //     .insertOne()
    console.log(req.body)
    res.status(200).json({
        register: 'register'
    })
})

app.get('/', async (req, res) => {
    let result = await _db.collection('students')
        .find()
        .toArray()
    res.json({ message: result })
})

app.use(express.json())
app.use(cors())
