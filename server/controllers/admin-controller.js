const ApiError = require('../exceptions/api-error')
const adminService = require('../service/admin-service')
class AdminController {
    async info(req, res, next) {
        try {
            const users = await adminService.info()
            console.log('adminService', users)
            res.json(users)
        }
        catch (e) { next(e) }
    }
}

module.exports = new AdminController()