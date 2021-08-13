const router = require('express').Router()



const {
    explorerGetController,
    singlePagePostController

} = require('../controllers/explorerController')

router.get('/:postId',singlePagePostController)


router.get('/',explorerGetController)


module.exports = router