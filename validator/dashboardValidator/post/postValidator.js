const { body } = require('express-validator')
const cheerio = require('cheerio')



module.exports = [
    body('title')
        .not().isEmpty().withMessage('Ttile can not be Empty')
        .isLength({ max: 100 }).withMessage('Title can not be more 100 chars')
        .trim()
    ,
    body('body')
        .not().isEmpty().withMessage('Body can not be Empty')
        .custom(value => {
            let node = cheerio.load(value)
            let text = node.text()

            if (text.length > 5000) {
                throw new Error('Body can not be more than 5000 chars')
            }
            return true
        })
]