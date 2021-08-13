const router = require('express').Router()
const { isAuthenticated } = require('../middleware/authMiddleware')
const profileValidator = require('../validator/dashboardValidator/profileValidator')

const {
    dashboardGetController,
    createProfileGetController,
    createProfilePostController,
    editProfileGetController,
    editProfilePostController
} = require('../controllers/dashboardController')

router.get('/', isAuthenticated, dashboardGetController)

router.get('/createProfile', isAuthenticated, createProfileGetController)
router.post('/createProfile', isAuthenticated, profileValidator, createProfilePostController)

router.get('/editProfile', isAuthenticated, editProfileGetController)
router.post('/editProfile', isAuthenticated, profileValidator, editProfilePostController)

module.exports = router;