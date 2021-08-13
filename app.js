const express = require('express')
const morgan = require('morgan')
const PORT = process.env.PORT || 3000


const app = express()
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

app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}`)
})
