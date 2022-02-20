const UserModel = require('./../models/user-model')
const RoleModel = require('../models/roles-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const emailService = require('./email-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')

class UserService {
    async reqistration(email, password, firstName, lastName, subscription) {

        const candidat = await UserModel.findOne({ email })
        if (candidat) {
            throw ApiError.BadRequest(`Такой email ${email} уже есть`)
        }
        const hashPassword = await bcrypt.hash(password, 4)
        const activationLink = uuid.v4()
        const userRole = await RoleModel.findOne({ value: "USER" })
        console.log('subscription server', subscription)
        const user = await UserModel.create({
            firstName,
            lastName,
            email,
            password: hashPassword,
            activationLink,
            roles: [userRole.value],
            subscription
        })
        //подтвердить подписку
        // await emailService.sendActivationLink(email, `${process.env.API_URL}/api/activate/${activationLink}`)
        //id, email, isActivated
        const userDto = new UserDto(user)
        // Генерируем accessToken, refreshToken
        const tokens = tokenService.generateToken({ ...userDto })
        //Сохраняем refreshToken пользователя в базе даных
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        console.log('User Create:', { ...tokens, user: userDto })
        return { ...tokens, user: userDto }
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email })
        if (!user) {
            throw ApiError.BadRequest(`Пользователь ${email} не зарегистрирован.`)
        }
        //сравниваем пароли
        const isPasswordEquls = await bcrypt.compare(password, user.password)
        if (!isPasswordEquls) {
            throw ApiError.BadRequest('Не верный логин или пароль.')
        }
        const userDto = new UserDto(user)
        const tokens = await tokenService.generateToken({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return { ...tokens, user: userDto }

    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink })
        console.log(user)
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
        user.isActivated = true


    }

    async refrash(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        // верефицируем токен
        const userData = tokenService.validateRefreshToken(refreshToken)
        // провкряем наличие токена в базе даных
        const tokenBd = await tokenService.findToken(refreshToken)
        if (!userData || !tokenBd) {
            throw ApiError.UnauthorizedError()
        }
        // за 60 дней информация могла изменится - обновляем данные о пользователе
        // После веритификации пользователя нам известен токен
        const user = await UserModel.findById(userData.id)
        // Разделяем данные пользователя 
        const userDto = new UserDto({ ...user })
        // Перезаписываем токен
        const tokens = tokenService.generateToken({ ...userDto })
        //Сохраняем refreshToken пользователя в базе даных
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        console.log('refrash token:', token)
        return { ...tokens, user: userDto }

    }

    async logout(refreshToken) {
        const token = tokenService.removeToken(refreshToken)
        return token
    }
}

module.exports = new UserService()