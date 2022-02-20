const Router = require('express').Router
const userControler = require('../controllers/user-controller')
const { body } = require('express-validator')
const router = new Router()

router.get('/identifyRole', userControler.identifyRole)
router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    userControler.registration)
router.post('/login',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }),
    userControler.login)
router.post('/loguot', userControler.logout)
router.get('/activate/:link', userControler.activate)
router.get('/refresh', userControler.refresh)

module.exports = router


