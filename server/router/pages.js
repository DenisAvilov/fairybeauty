const exspress = require('express')
const pagesControler = require('../controllers/pages-controller')
const router = exspress.Router()
const authMiddleware = require('../middlewares/auth-middleware')
const roleMiddleware = require('../middlewares/role-middleware')


router.route('/blog')
    .get(roleMiddleware(["USER"]), pagesControler.posts)
    .post(pagesControler.post)

module.exports = router