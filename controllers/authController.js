const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')


const User = require('../models/User')
const errorFormatter = require('../utils/validationErrorFormatter')


exports.signupGetController =  (req, res, next) => {
    res.render('pages/auth/signup', {title:'Create A New Account'})
}

exports.singupPostController = async (req, res, next) => {

    let errors = validationResult(req).formatWith(errorFormatter)

    if (!errors.isEmpty()) {
        return res.render('pages/auth/signup', {
            title: 'Create A New Account'
        })
    }

    let { username, email, password } = req.body
    

    try {
        let hashedPassword = await bcrypt.hash(password, 11)
            
        let user = new User({
            username,
            email,
            password : hashedPassword
        })


        let createUser = await user.save()
        console.log('User Created Successfully',createUser)
        res.render('pages/auth/login', {
            title: 'Login Your Account'
        })
    } catch (e) {
        console.log(e)
        next(e)
        
    }

}

exports.loginGetController = (req, res, next) => {
    res.render('pages/auth/login', {title:'Login Your Account'})

}

exports.loginPostController =async (req, res, next) => {

    let { email, password } = req.body
    
    try {
        let user = await User.findOne({ email })
        if (!user) {
            res.send('Invalid user')
        }
        
        let match =await bcrypt.compare(password, user.password)
        if (!match) {
            res.send('Invalid user')
        }

        req.session.isLoggedIn = true
        req.session.user = user
        req.session.save(e => {
            if (e) {
                console.log(e);
                return next(e)
            }
            res.redirect('/dashboard')

        })
    } catch (e) {
        console.log(e)
        next(e)
    }

}

exports.logoutController = (req, res, next) => {
    req.session.destroy(e => {
        if (e) {
            console.log(e);
            return next(e)
            
        }
        res.redirect('/auth/login')
    })

}