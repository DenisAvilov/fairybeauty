const BlogModel = require('../models/blog-model')
const UserDto = require('../dtos/user-dto')
class BlogService {
    async posts() {
        const posts = await BlogModel.find()

        return { posts }
    }
    async post(title, body, comments) {
        // if (!title && !body) {
        //     return false
        // }
        const post = await BlogModel.create(
            { title, body }
        )
        return { post }
    }
}

module.exports = new BlogService()