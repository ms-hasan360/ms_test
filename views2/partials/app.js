const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const PORT = process.env.PORT || 3000


const app = express()

const MONGODB_URL = 'mongodb://localhost:27017/myapp'


// setup views engine
app.use(morgan('dev'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/signup', (req, res) => {
    res.render('pages/signup', { title: 'MS | AH' })
})

app.get('/login', (req, res) => {
    res.render('pages/login', { title: 'MS | AH' })
})

app.get('/dashboard', (req, res) => {
    res.render('pages/dashboard', { title: 'MS | AH' })
})

app.get('/', (req, res) => {
    res.render('pages/main', { title: 'MS | AH'})
})

app.get('*', (req, res) => {
    res.send("<h1>404 Not Found</h1>")
})

mongoose.connect(MONGODB_URL,
    { useNewUrlParser: true })
    .then(() => {
        console.log('Database connected')
        app.listen(PORT, () => {
            console.log(`server is running http://localhost:${PORT}`)
        })
    })
    .catch(e => {
        return console.log(e)
    })
