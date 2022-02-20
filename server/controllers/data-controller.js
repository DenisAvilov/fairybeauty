const ApiError = require('../exceptions/api-error')
const contentService = require('../service/content-service')
class DataControler {
    async home(req, res, next) {
        try {
            const users = await contentService.users()
            res.json(users)
        }
        catch (e) { next(e) }
    }
}

module.exports = new DataControler()