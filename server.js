import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import pg from "pg"
import env from "dotenv/config"


const app = express()
const PORT = process.env.SERV_PORT
// console.log(process.env.DB_HOST)
// console.log(PORT)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${JSON.stringify(req.body)}`)
    next()
})

const {Pool} = pg
const pool = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_INSTANCE ,
    password: process.env.DB_PASSW,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
})

// let notes = []

app.get("/api/notes", async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM notes')
        console.log(result.rows)
        res.json(result.rows)
    } catch (err) {
        console.err(err.message)
        res.status(500).send('Server Error')
    }
})

app.post("/api/notes", async (req, res) => {
    console.log(req.body)

    try {
        const {title, content} = req.body
        
        // console.log(content)
        const result = await pool.query(
            'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *',
             [title, content])
    } catch (err) {
        console.err(err.message)
        res.status(500).send('Server Error')
    }
})

app.delete("/api/notes/:id", async (req, res) => {
    // console.log(req.params)
    try{
        const {id} = req.params
        await pool.query(
            'DELETE FROM notes WHERE id = $1', [id]
        )
        res.json({message: 'Nota borrada'})
    } catch (err) {
        console.err(err.message)
        res.status(500).send('Server Error')
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

