const Post = require('../../models/Post')

exports.likeGetController = async (req, res, next) => {
    let { postId } = req.params
   
    let liked =null

    if (!req.user) {
        return res.status(403).json({
            error: 'you are not authenticated user'
        })
    }
    let userId = req.user._id

    try {
        let post = await Post.findById(postId)
        if (post.dislikes.includes(userId)) {
            await Post.findOneAndUpdate(
                { _id: postId },
                { $pull: { 'dislikes': userId } }
            )
        }
        if (post.likes.includes(userId)) {
            await Post.findOneAndUpdate(
                { _id: postId },
                { $pull: { 'likes': userId } }
            )
            liked = false
        } else {
            await Post.findOneAndUpdate(
                { _id: postId },
                { $push: { 'likes': userId } }
            )
            liked = true
        }

        let updatedpost = await Post.findById(postId)
        res.status(200).json({
            liked,
            totalLikes: updatedpost.likes.length,
            totalDislikes: updatedpost.dislikes.length
        })
        
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: 'server error'
        })
    }

}

exports.dislikesGetController =async (req, res, next) => {
    let { postId } = req.params
    
    let disliked = null

    if (!req.user) {
        return res.status(403).json({
            error: 'you are not authenticated user'
        })
    }
    let userId = req.user._id

    try {
        let post = await Post.findById(postId)
        if (post.likes.includes(userId)) {
            await Post.findOneAndUpdate(
                { _id: postId },
                { $pull: { 'likes': userId } }
            )
        }

        if (post.dislikes.includes(userId)) {
            await Post.findOneAndUpdate(
                { _id: postId },
                { $pull: { 'dislikes': userId } }
            )
            disliked = false
        } else {
            await Post.findOneAndUpdate(
                { _id: postId },
                { $push: { 'dislikes': userId } }
            )
            disliked = true
        }

        let updatedpost = await Post.findById(postId)
        res.status(200).json({
            disliked,
            totalLikes: updatedpost.likes.length,
            totalDislikes: updatedpost.dislikes.length
        })
        
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: 'server error'
        })
    }
}