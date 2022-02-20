const blogService = require('../service/blog-service')
// const { validationResult } = require('express-validator')
// const ApiError = require('../exceptions/api-error')
class PagesController {

    async posts(req, res, next) {
        try {
            const posts = await blogService.posts()
            console.log(posts)
            return res.json(posts)

        }
        catch (e) { next(e) }
    }

    async post(req, res, next) {
        try {
            const { title, body, comments } = req.body
            const post = await blogService.post(title, body, comments)
            return res.json(post)
        }
        catch (e) { next(e) }

    }



}

module.exports = new PagesController()