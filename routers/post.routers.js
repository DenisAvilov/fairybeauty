const { Router } = require('express')
const Post = require('./../models/Post')
const auth = require('../middleware/auth.middleware')
const config = require('config')
// создает короткие непоследовательные уникальные идентификаторы
const shortid = require('shortid')
const router = Router()

router.post('/create', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const { postContent } = req.body
        const code = shortid.generate()      //  2:22:00
        console.log('post.router.js/req.body:', postContent)
        console.log('post.router.js/req.user.userId:', req.user.userId)

        // const existing = await Post.findOne({ to })
        // // console.log('post.router.js/existing:', existing)
        // if (existing) {
        //     return res.json({ post: existing })
        // }
        const to = baseUrl + '/post/' + code
        const createPost = new Post({
            to: to,
            title: postContent.title,
            contant: postContent.contant,
            owner: req.user.userId
        })

        await createPost.save()

        res.status(201).json({ message: createPost })



        //Почитать 2.25 min
        //Почитать 2.33 min
        // https://prognote.ru/web-dev/back-end/how-to-work-in-node-js-with-mongodb/
        //построение Api
        //https://habr.com/ru/post/599127/
        //
        //https://habr.com/ru/post/414951/
        //Swagger (OpenAPI 3.0)
        //https://habr.com/ru/post/541592/

    }
    catch (e) {
        res.status(500).json({ message: 'Что то пошло не так post /post' })
    }
})

router.get('/', async (req, res) => {
    try {

        const posts = await Post.find()
        // const posts = 'Test Posts'

        res.status(200).json(posts)
    }
    catch (e) {
        res.status(500).json({ message: 'Что то пошло не так get post/' })
    }
})

// router.get('/:id', auth, async (req, res) => {
//     // try {
//     //     const post = await Post.findById(req.params.id) /// ???
//     //     res.json(post)
//     // }
//     // catch (e) {
//     //     res.status(500).json({ message: 'Что то пошло не так get /:id' })
//     // }
// })


module.exports = router