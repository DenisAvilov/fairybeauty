const Router = require('express').Router
const adminController = require('../controllers/admin-controller')
const router = new Router()

router.get('/api/info', adminController.info)

module.exports = router