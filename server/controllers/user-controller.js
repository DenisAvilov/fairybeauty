const Role = require('../models/roles-model')
const userService = require('../service/user-service')
const { validationResult } = require('express-validator')
const ApiError = require('../exceptions/api-error')
const res = require('express/lib/response')
class UserController {

    async registration(req, res, next) {
        try {
            // Получаем результат валидации, передпем req
            const error = validationResult(req)
            if (!error.isEmpty()) {
                //если масив не пустой то нужно передать этот масив в api-error middleware.
                //в error выбираем масив ошибок
                return next(ApiError.BadRequest('Ошибка при валидации', error.array()))
            }

            const { email, password, firstName, lastName, subscription } = req.body
            console.log('req.body', req.body)
            const userData = await userService.reqistration(email, password, firstName, lastName, subscription)
            //сохраняем refreshToken в куках. require('cookie-parser') в index.js
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            return res.json(userData)
        }
        catch (e) { next(e) }
    }

    async activate(req, res, next) {
        try {
            // console.log('activate', req)
            const activationLink = req.params.link
            await userService.activate(activationLink)
            res.redirect(process.env.CLIENT_URL_TEST)
        }
        catch (e) { next(e) }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            return res.json(userData)
        }
        catch (e) { next(e) }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            console.log(`logout:`, refreshToken)
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        }
        catch (e) { next(e) }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userData = await userService.refrash(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            // console.log('refreshToken^', refreshToken)
            return res.json(userData)
        }
        catch (e) { next(e) }
    }

    async identifyRole(req, res, next) {
        try {
            const userRole = new Role()
            const adminRole = new Role({ value: "USER" })
            await userRole.save()
            await adminRole.save()
            return res.json("Server work identifyRole")
        }
        catch (e) { next(e) }
    }

}

module.exports = new UserController()