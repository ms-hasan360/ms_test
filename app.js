const express = require('express')
const PORT = process.env.PORT || 3000

const app = express()

app.get('/', (req, res) => {
    res.send('Test For Heroku')
})

app.get('*', (req, res) => {
    res.send("<h1>404 Not Found</h1>")
})

app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}`)
})
