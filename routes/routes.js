const authRoute = require('./authRoute')
const dashboardRoutes = require('./dashboardRoute')
const uploadRoutes = require('./uploadRoute')
const postRoutes = require('./postRoute')
const apiRoutes = require('../api/routes/apiRoutes')
const explorerRoutes = require('../routes/explorerRoute')
const searchRoute = require('../routes/searchRoute')

const routes = [
    {
        path: '/auth',
        handler: authRoute

    },
    {
        path: '/dashboard',
        handler: dashboardRoutes
    },
    {
        path: '/posts',
        handler: postRoutes
    },
    {
        path: '/uploads',
        handler: uploadRoutes

    },
    {
        path: '/api',
        handler: apiRoutes

    },
    {
        path: '/explorer',
        handler: explorerRoutes

    },
    {
        path: '/search',
        handler: searchRoute

    },
    {
        path: '/',
        handler: explorerRoutes
    }

]


module.exports = app => {
    routes.forEach(r => {
        if (r.path == '/') {
            app.get(r.path, r.handler)
        } else {
            app.use(r.path, r.handler)
        }
    })
}