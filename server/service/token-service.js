const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token-model')

class TokenService {

    //Валидация токена, проверка на срок действия и не поделан ли он
    validateAccessToken(token) {
        try {
            //после того как токен мы верифицируем, правалидируем
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        }
        catch (e) {
            return null
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        }
        catch (e) {
            return null
        }
    }
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '5d' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({ user: userId })
        if (tokenData) {
            //перезаписываем refresh токен в базе даных
            tokenData.refreshToken = refreshToken
            //обновляем refresh в базе даных
            return tokenData.save()
        }
        //Пользователь логиница первый раз и записи с его aйдишником нету 
        const token = await tokenModel.create({ user: userId, refreshToken })
        return token
    }
    async removeToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne({ refreshToken })
        return tokenData
    }
    // Проверяем наличие токена в бз
    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({ refreshToken })
        return tokenData
    }

}

module.exports = new TokenService()