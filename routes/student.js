import connection from "../models/dbConnection.js"
import express from "express"

let _db = null
const app = express.Router()

connection.connectToDb(err => {
    if (err)
        return
    _db = connection.getDb()
})

app.route('/semester-application/:reg/:year/:sem')
    .get(async (req, res) => {
        let { reg, year, sem } = req.params
        console.log({ regulation: reg, year: parseInt(year), semester: parseInt(sem) })
        let subjects = await _db.collection('regulationSubjects')
            .findOne({ regulation: reg, year: parseInt(year), semester: parseInt(sem) })
        delete subjects._id
        res.status(200).json({
            result: subjects
        })
    })

const students = app
export default students
