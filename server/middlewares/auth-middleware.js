const ApiError = require('../exceptions/api-error')
const tokenService = require('../service/token-service')
module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const accessToken = req.headers.authorization.split(' ')[1]
        if (!accessToken) {
            return next(ApiError.UnauthorizedError())
        }
        //Валидация токена 
        const userData = tokenService.validateAccessToken(accessToken)
        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }
        //В поле user у req присваеваем данные о пользователе которые вытащили у токена
        //Это делаем для того что использовать данные в других функциях
        req.user = userData
        next()
    }
    catch (e) { next(ApiError.UnauthorizedError(e)) }
}