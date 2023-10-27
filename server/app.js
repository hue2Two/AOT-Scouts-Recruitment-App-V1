//import config & initilize server
const express = require("express")
const app = express()

//other config
const cors = require("cors")
app.use(cors())
const dotenv = require("dotenv")
dotenv.config()
app.use(express.json())

//mysql
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
})

app.get('/', (req, res) => {
    console.log("req: " + " " + req.url + " " + req.method)

    pool.getConnection((err, connection) => {
        if(err) {
            console.log("err: " + err)
        }

        console.log("connection state: " + connection.state)

        //query method >> 3 parameters
        connection.query('SELECT * FROM names', (err, results) => {
            connection.release() //return connection to pool

            if(err) {
                console.log("err: " + err)
            } else {
                res.json({
                    message: "hello there",
                    tableData: results,
                })
            }
        })

    })
})

app.get('/getAll', (req, res) => {
    console.log("req: " + " " + req.url + " " + req.method)
    
    pool.getConnection((err, connection) => {
        if(err) {
            console.log("err: " + err)
        } 

        connection.query('SELECT * FROM names', (err, results) => {
            connection.release()

            if(err) {
                console.log("err" + err)
            } else {
                console.log("retrieved data: " + JSON.stringify(results))
                //send back to front end console
                return res.json({
                    message: "hello there",
                    tableData: results,
                })
            }
        })
    })

})

app.post('/quizSubmission', (req, res) => {
    console.log("req: " + " " + req.url + " " + req.method)

    pool.getConnection((err, connection) => {

        if(err) {
            console.log(err)
        } else {
            //add an array an array to save results
            let quizFormData = req.body.quizData
            for (let i = 0; i < quizFormData.length; i++) {
                connection.query(
                     `
                        INSERT INTO names (
                            name
                        )
                        VALUES (
                            '${quizFormData[i]}'
                        )
                    `, (err, results) => {
                        //put release here, after parameter
                        connection.release()
                        if(err) {
                            console.log("err" + err)
                        } else {
                            //push results into array

                            // res.json({
                            //     message: "hello there",
                            //     tableData: results,
                            // })
                        }
                    }
                )
            }
        }
       
        // connection.release()
        })
})

app.post('/scoutFormSubmission', (req, res) => {
    console.log("req: " + " " + req.url + " " + req.method)

    pool.getConnection((err, connection) => {
        if(err) {
            console.log(err)
        } else {
            let scoutFormData = req.body.scoutFormInfo
            //inserts into row
            connection.query(
                `
                INSERT INTO scouts (
                    name,
                    dob,
                    reason,
                    q1,
                    q2,
                    q3,
                    q4,
                    q5
                )

                VALUES (
                    '${scoutFormData[0]}',
                    '${scoutFormData[1]}',
                    '${scoutFormData[2]}',
                    '${scoutFormData[3]}',
                    '${scoutFormData[4]}',
                    '${scoutFormData[5]}',
                    '${scoutFormData[6]}',
                    '${scoutFormData[7]}'
                )
                `, (err, results) => {
                    connection.release()
                }
            )
        }
    })
})
    



app.listen(process.env.PORT, ()=> console.log('app is running'));