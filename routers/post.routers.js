const { Router } = require('express')
const Post = require('../models/Post')
const router = Router()

router.post('/post', async (req, res) => {
    try { }
    catch (e) {
        res.status(500).json({ message: 'Что то пошло не так post /post' })
    }
})

router.get('/', async (req, res) => {
    try { }
    catch (e) {
        res.status(500).json({ message: 'Что то пошло не так get /' })
    }
})

router.get('/:id', async (req, res) => {
    try { }
    catch (e) {
        res.status(500).json({ message: 'Что то пошло не так get /:id' })
    }
})


module.exports = router