require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')



const app = express() 


const MONGODB_URL = 'mongodb://localhost:27017/myapp'

//impost middlewaer
const setmiddleware= require('./middleware/middleware')
//import routes
const setRoutes = require('./routes/routes')





const PORT = process.env.PORT || 3000

//setup views engine
app.set('view engine', 'ejs')
app.set('views', 'views')


//using middleware
setmiddleware(app)

// using routes from routes directory
setRoutes(app)


app.use((req, res, next)=> {
    let error = new Error('404 Page Not Found')
    error.status = 404
    next(error)
    
})

app.use((error, req, res, next) => {
    if (error.status == 404) {
        return res.render('pages/error/404')
    }
    res.render('pages/error/500')
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

