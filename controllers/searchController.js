const Post = require('../models/Post')

exports.searchResultGetController = async  (req, res, next) => {
    let term = req.query.term
    let currentPage = parseInt(req.query.page) || 1
    let itemPage = 5

    try {
        let posts = await Post.find({
            $text: {
                $search : term
            }
        })
            .skip(itemPage * currentPage - itemPage)
            .limit(itemPage)
        
        let totalPost = await Post.countDocuments({
            $text: {
                $search: term
            }
        })

        let totalPage = totalPost / itemPage

        res.render('pages/explorer/search', {
            title: `Search Result - ${term}`,
            SearchTerm: term,
            totalPage,
            currentPage,
            itemPage,
            totalPost,
            posts
        })
    } catch (e) {
        next(e)
    }

}