const express = require('express')
const morgan = require('morgan')
const session =require('express-session')
const mongoDBStore = require('connect-mongodb-session')(session)

const { blindUserWithRequest } = require('./authMiddleware')
const setLocals = require('./setLocals')


const MONGODB_URL = 'mongodb://localhost:27017/myapp'
const store = new mongoDBStore({
    uri: MONGODB_URL,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 2
});



const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || 'SECRET_KEY',
        resave: false,
        saveUninitialized: false,
        store: store
    }),
    blindUserWithRequest(),
    setLocals()
]

module.exports = app => {
    middleware.forEach(m => {
        app.use(m)
    })
}