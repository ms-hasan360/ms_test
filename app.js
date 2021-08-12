const express = require('express')
const PORT = process.env.PORT || 3000

const app = express()
// setup views engine
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', (req, res) => {
    res.render('pages/full_part')
})

app.get('*', (req, res) => {
    res.send("<h1>404 Not Found</h1>")
})

app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}`)
})
