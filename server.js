import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import pg from "pg"
import env from "dotenv/config"

//Setting up our frameworks and important variables. Please note that you would need to set up a .env file with the correct values on your end.
const app = express()
const PORT = process.env.SERV_PORT

//Setting up the middleware used by the application
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

//This is used for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${JSON.stringify(req.body)}`)
    next()
})

//We set up our connection to the database.
const {Pool} = pg
const pool = new Pool({
    user: process.env.DB_USER,
    database: process.env.DB_INSTANCE ,
    password: process.env.DB_PASSW,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
})

//This is the default get route. All it does is select all relevant information from our database, if no information is received or the connection to the db is refused it returns an error.
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


//This is the route to post new notes. If the connection refuses it returns an error.
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


//This is the delete route, we use the id for proper location of the note being deleted.
app.delete("/api/notes/:id", async (req, res) => {
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

//This is used to set up our server.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

