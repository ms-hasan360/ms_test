const router = require('express').Router()
const { isAuthenticated } = require('../../middleware/authMiddleware')

const {
    getCommentController,
    replyCommentPostController

} = require('../controllers/commentsController')

const {
    likeGetController,
    dislikesGetController
} = require('../controllers/lilkeDislikeController')


const {
    bookmarksGetController
} = require('../controllers/bookmarkController')


router.post('/comments/:postId', isAuthenticated, getCommentController)
router.post('/comments/replies/:commentId', isAuthenticated, replyCommentPostController)

router.get('/likes/:postId', isAuthenticated, likeGetController)
router.get('/dislikes/:postId', isAuthenticated, dislikesGetController)

router.get('/bookmarks/:postId', isAuthenticated, bookmarksGetController)

module.exports = router