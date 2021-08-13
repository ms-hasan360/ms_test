const router = require('express').Router()
const { body } = require('express-validator')

const user = require('../models/User')


const {
    signupGetController,
    singupPostController,
    loginGetController,
    loginPostController,
    logoutController
} = require('../controllers/authController')

//Sign up validation check

// const signupValidator = [
//     body('username')
//         .isLength({ min: 2, max: 15 })
//         .withMessage('Username Must Be between  2 to 15')
//         .custom(async username => {
//             let user = await User.findOne({ username })
//             if (!user) {
//                 return Promise.reject('Username already used')
//             }
//         }).trim()
//     ,
//     body('email')
//         .isEmail()
//         .withMessage('Please provide a valid Email')
//         .custom(async email => {
//             let Email = await User.findOne({ email })
//             if (!Email) {
//                 return Promise.reject('Email already used')
//             }
//         }).normalizeEmail()
//     ,
//     body('password')
//         .isLength({ min: 2 })
//         .withMessage('Password must be greater than 2 chars')
//     ,
//     body('confirmPassword')
//         .isLength({ min: 2 })
//         .withMessage('Password must be greater than 2 chars')
//         .custom((confirmPassword, { req }) => {
//             if (confirmPassword != req.body.password) {
//                 throw new error('Password doesn\'t match')
//             }
//             return true
//         })

// ]
const { isUnAuthenticated } = require('../middleware/authMiddleware')



router.get('/signup', isUnAuthenticated, signupGetController)
router.post('/signup', isUnAuthenticated, singupPostController)
router.get('/login', isUnAuthenticated, loginGetController)
router.post('/login', isUnAuthenticated, loginPostController)
router.get('/logout', logoutController)

module.exports = router