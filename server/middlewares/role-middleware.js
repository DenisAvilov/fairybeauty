const ApiError = require('../exceptions/api-error')
const tokenService = require('../service/token-service')
module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const accessToken = req.headers.authorization.split(' ')[1]
            if (!accessToken) {
                return next(ApiError.UnauthorizedError())
            }
            //Валидация токена 
            const { role: userRoles } = tokenService.validateAccessToken(accessToken)
            let hasRole = false
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
                if (!hasRole) {
                    return next(ApiError.UnautRoleError())
                }
            });
            next()
        }
        catch (e) { next(ApiError.UnauthorizedError(e)) }
    }

} 