const Comment = require('../../models/Comment')
const Post = require('../../models/Post')

exports.getCommentController = async (req, res, next) => {
    let { postId } = req.params
    let { body } = req.body
    if (!req.user) {
        return res.status(403).json({
            error: 'you are not authenticated user'
        })
    }
    let comment = new Comment({
        post: postId,
        user: req.user._id,
        body,
        replies: []
    })

    try {
        let createdComment = await comment.save()
        await Post.findOneAndUpdate(
            { _id: postId },
            { $push: { 'comments': createdComment } }
        )

        let commentJson = await Comment.findById(createdComment._id).populate({
            path: 'user',
            select: 'profilePics username'
        })

        return res.status(201).json(commentJson)

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: 'server error'
        })
    }
}

exports.replyCommentPostController = async (req, res, next) => {
    let { commentId } = req.params
    let { body } = req.body
    if (!req.user) {
        return res.status(403).json({
            error: 'you are not authenticated user'
        })
    }
    
    let reply = {
        user: req.user._id,
        body
    }

    try {
        await Comment.findOneAndUpdate(
            { _id: commentId },
            { $push: { 'replies': reply } }
        )

        res.status(201).json({
            ...reply,
            profilePics: req.user.profilePics
        })
 
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: 'server error'
        })
    }
}