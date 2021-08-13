const router = require('express').Router()
const multer = require('multer')
const path = require('path')




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
    uploadProfilePics,
    removeProflilePics,
    postImageUploadController
} = require('../controllers/uploadController')


router.post('/profilePics', isAuthenticated, upload.single('profilePics'), uploadProfilePics)

router.delete('/profilePics', isAuthenticated, removeProflilePics)


router.post('/postimage', isAuthenticated, upload.single('post-image'), postImageUploadController)

module.exports = router