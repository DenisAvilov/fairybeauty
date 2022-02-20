const jwt = require('jsonwebtoken') // method verify помогает разкодировать токен
const config = require('config')
module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

        console.log('req.headers token:', token)

        if (!token) {
            return res.status(401).json({ message: 'Нет авторизации' })
        }


        console.log('config.get:', config.get('jwtSecret'))


        const decoded = jwt.verify(token, 'zhuravka web app', function (err, decoded) {
            if (err) {
                console.log('jwt.verify err', err.name)
            } else {
                return decoded
            }
        })

        req.user = decoded
        console.log('decoded:', decoded)
        console.log('req.user:', req.user)
        next()

        //Создаю  поле user и склаываю туда разкодированый токен

    }
    catch (e) {
        res.status(401).json({ message: 'Нет авторизации' })
    }
}