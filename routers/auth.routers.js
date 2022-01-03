const { Router } = require('express')
//Валидация полей https://express-validator.github.io/docs/custom-error-messages.html
const { check, validationResult } = require('express-validator')
//connect BD  https://mongoosejs.com/docs/api.html#mongoose_Mongoose-ObjectId
const mongoose = require('mongoose')
// Модел пользователя
const User = require('./../models/User')
// Кеширование данных
const bcrypt = require('bcryptjs')
// Токен
const jwt = require('jsonwebtoken')
const config = require('config')
const router = Router() //Router это концепт middleware в express

router.post('/register',
    [
        check('email')
            .normalizeEmail()
            .isEmail()
            .withMessage({
                message: 'Введите коректный email',
                errorCode: 1,
            }),
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            //Проверка на ошибки
            const errors = validationResult(req)

            console.log('req.body ', req.body)

            //обрабатываем валидацию входящих запросов от клиента 
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: errors.array(),
                    message: 'Не корректные данные при регистрации cms от сервера'
                })
            }

            //Получаем данные от клиента
            const { firstName, lastName, email, subscription, password } = req.body
            // Модель это - Сущность работающая с пользователями
            //Проверяем в БЗ email
            const candidate = await User.findOne({ email })
            if (candidate) {
                return req.status(400).json({ message: 'Такой пользователь уже существует' })
            }

            //  кешируем пароль, второй параметр позволяет больше кешировать пароль
            const hashedPassword = await bcrypt.hash(password, 12)
            // Создаем нового пользователся
            const user = new User({ firstName, lastName, email, subscription, password: hashedPassword })
            //  Ждем пока пользователь сохранится
            await user.save()
            // Проверка на совпадение паролей, помагает сканировать закешированные пароли
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ message: "Парольная ошибка" })
            }
            // Делаем авторизацию с помощью токена
            const token = jwt.sign(
                {
                    // Указываем данные которые будут зашифрованны в этом токене
                    userId: user.id,
                },
                // Секрктный ключ
                config.get('jwtSecret'),
                // Время жизненого цикла токена
                {
                    expiresIn: '1h'
                }
            )
            res.status(201).json({ token, userId: user.id, message: "Регистрация прошла успешно, добро пожаловать!" })

        }
        catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так' })
        }

    })

router.post('/login',
    [
        check('email')
            .normalizeEmail()
            .isEmail()
            .withMessage({
                message: 'Введите коректный email',
                errorCode: 1,
            }),
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            //Проверка на ошибки
            const errors = validationResult(req)

            //обрабатываем валидацию входящих запросов от клиента 
            if (!errors.isEmpty()) {
                res.status(400).json({
                    error: errors.array(),
                    message: 'Не корректные данные при входе'
                })
            }

            //Получаем данные от клиента
            const { email, password } = req.body

            // Модель это - Сущность работающая с пользователями
            //Проверяем user 
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: "Пользователь не найден" })
            }


            // Проверка на совпадение паролей, помагает скавнивать закешированные пароли
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ message: "Парольная ошибка" })
            }
            // Делаем авторизацию с помощью токена
            const token = jwt.sign(
                {
                    // Указываем данные которые будут зашифрованны в этом токене
                    userId: user.id,
                },
                // Секрктный ключ
                config.get('jwtSecret'),
                // Время жизненого цикла токена
                {
                    expiresIn: '1h'
                }
            )

            res.json({ token, userId: user.id, message: "Вход выполнен, добро пожаловать!" })


        }
        catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так' })
        }


    })

module.exports = router