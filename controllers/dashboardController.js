const { validationResult } = require('express-validator')
const Profile = require('../models/Profile')
const User = require('../models/User')
const errorFormatter = require('../utils/validationErrorFormatter')

exports.dashboardGetController = async (req, res, next) => {

    try {
        let profile = await Profile.findOne({
            user: req.user._id
        })
        if (profile) {
            return res.render('pages/dashboard/dashboard', {
                title: 'my dashboard'
            })
        }
        res.redirect('dashboard/createProfile')
    } catch (e) {
        next(e)
    }

}

exports.createProfileGetController = async (req, res, next) => {
    try {
        let profile = await Profile.findOne({
            user: req.user._id
        })
        if (profile) {
            return res.redirect('/dashboard/editProfile')


        }
        res.render('pages/dashboard/createProfile',
            {
                title: 'Create your Profile',
                error: {}
            })

    } catch (e) {
        next(e)
    }
}


exports.createProfilePostController = async (req, res, next) => {
    let errors = validationResult(req).formatWith(errorFormatter)

    if (!errors.isEmpty()) {
        return res.render('pages/dashboard/createProfile',
            {
                title: 'Create your Profile',
                error: errors.mapped()
            })
    }

    let { name, title, bio, website, facebook, twitter, github } = req.body

    try {
        let profile = new Profile({
            user: req.user._id,
            name,
            title,
            bio,
            profilePics: req.user.profilePics,
            links: {
                website: website || '',
                facebook: facebook || '',
                twitter: twitter || '',
                githu: github || ''
            },
            posts: [],
            bookmarks: []
        })

        let createdProfile = await profile.save()
        await User.findOneAndUpdate(
            { _id: req.user._id },
            { $set: { profile: createdProfile._id } }
        )

        res.redirect('/dashboard')

    } catch (e) {
        next(e)
    }
}

exports.editProfileGetController = async (req, res, next) => {
    try {
        let profile = await Profile.findOne({
            user: req.user._id
        })
        if (!profile) {
            return res.redirect('/dashboard/createProfile')
        }
        res.render('pages/dashboard/editProfile', {
            title: 'Edit Your Profile',
            error: {},
            profile
        })

    } catch (e) {
        next(e)
    }
}

exports.editProfilePostController = async (req, res, next) => {
    let errors = validationResult(req).formatWith(errorFormatter)
    let { name, title, bio, website, facebook, twitter, github } = req.body

    if (!errors.isEmpty()) {
        return res.render('pages/dashboard/createProfile',
            {
                title: 'Create your Profile',
                error: errors.mapped(),
                profile: {
                    name,
                    title,
                    bio,
                    links: {
                        website,
                        facebook,
                        twitter,
                        github
                    }
                }
            })
    }
    try {
        let profile = {
            name,
            title,
            bio,
            links: {
                website: website || '',
                facebook: facebook || '',
                twitter: twitter || '',
                githu: github || ''
            }
        }

        let updateProfile = await Profile.findOneAndUpdate(
            { user: req.user._id },
            { $set: profile },
            { new: true }
        )
        res.render('pages/dashboard/editProfile', {
            title: 'Edit Your Profile',
            error: {},
            profile: updateProfile
        })

    } catch (e) {
        next(e)
    }
}


