const moment = require('moment')
const Post = require('../models/Post')
const Profile  = require('../models/Profile')

function generateDate(days) {
    let date = moment().subtract(days, 'days')
    return date.toDate()
}

function generateFilterObject(filter) {
    let filterObj = {}
    let order = 1
    switch (filter) {
        case 'week': {
            filterObj = {
                createdAt: {
                    $gt: generateDate(7)
                }
            }
            order = -1
            break
        }
        case 'month': {
            filterObj = {
                createdAt: {
                    $gt: generateDate(30)
                }
            }
            order = -1
            break
        }
        case 'all': {
            order = -1
            break
        }
        default:
            'latest'
            break

    }

    return {
        filterObj,
        order
    }
}

exports.explorerGetController = async (req, res, next) => {
    let filter = req.query.filter || ''
    let currentPage = parseInt(req.query.page) || 1
    let itemPage = 6

    let { order, filterObj } = generateFilterObject(filter.toLowerCase())

    try {
        let posts = await Post.find(filterObj)
            .sort(order == 1 ? '-createdAt' : 'createdAt')
            .populate('author', 'username')
            .skip((itemPage * currentPage) - itemPage)
            .limit(itemPage)
        
        
        let totalPost = await Post.countDocuments()
        let totalPage = (totalPost / itemPage)
        let bookmarks = []

        if (req.user) {
            let profile  = await Profile.findOne({user : req.user._id})
            if (profile) {
                bookmarks = profile.bookmarks
            }
        }
        
        res.render('pages/explorer/explorer', {
            title: 'Explore All Post',
            filter,
            posts,
            itemPage,
            currentPage,
            totalPage,
            bookmarks,
            totalPost
        })

    } catch (e) {
        next(e)
    }
}

exports.singlePagePostController = async (req, res, next) => {
    let { postId } = req.params
    
    try {
        let post = await Post.findById(postId)
            .populate('author','username profilePics')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select : 'username profilePics'
                }
            })
            .populate({
                path: 'comments',
                populate: {
                    path: 'replies.user',
                    selesct : 'username profilePics'
                }
            })
        
        if (!post) {
            let error = new Error('404 page not found')
            error.status = 404
            throw error
        }

        let bookmarks = []
        if (req.user) {
            let profile = await Profile.findOne({ user: req.user._id })
            if (profile) {
                bookmarks = profile.bookmarks
            }
        }

        res.render('pages/explorer/singlePage', {
            title: post.title,
            bookmarks,
            post
        })


        
    } catch (e) {
        next(e)
    }
}