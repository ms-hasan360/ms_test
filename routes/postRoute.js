const router = require('express').Router()
const multer = require('multer')
const path = require('path')


const postValidator = require('../validator/dashboardValidator/post/postValidator')
const { isAuthenticated } = require('../middleware/authMiddleware')
// const upload = require('../middleware/uploadMiddleware')




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)

    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5

    },
    fileFilter: (req, file, cb) => {
        const types = /jpeg|jpg|png|gif/
        const extName = types.test(path.extname(file.originalname).toLowerCase())
        const mimeType = types.test(file.mimetype)

        if (extName && mimeType) {
            cb(null, true)
        } else {
            cb(new Error('Only support images'))
        }
    }
})

const {
    createPostGetController,
    createPostPostController,
    editPostGetController,
    editPostPostController,
    deletePostGetController,
    postsGetcontroller
} = require('../controllers/postController')

router.get('/create', isAuthenticated, createPostGetController)

router.post('/create', isAuthenticated, upload.single('post-thumbnail'), postValidator, createPostPostController)

router.get('/edit/:postId', isAuthenticated, editPostGetController)
router.post('/edit/:postId', isAuthenticated, upload.single('post-thumbnail'), postValidator, editPostPostController)
router.get('/delete/:postId', isAuthenticated, deletePostGetController)
router.get('/',isAuthenticated, postsGetcontroller)

module.exports = router