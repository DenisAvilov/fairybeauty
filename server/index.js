require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const routerAuth = require('./router/auth')
const routerAdmin = require('./router/admin')
const routerPages = require('./router/pages')
const errorMiddleware = require('./middlewares/error-middleware')
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors(
    //1.Разрешаем эти куки
    //2.Указываем клиентский домен 
    {
        credentials: true,
        origin: process.env.CLIENT_URL
    }
)
)

app.use('/api', routerAuth)
app.use('/admin', routerAdmin)
app.use('/', routerPages)
app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.HOST, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, (req, res) => {
            console.log(`Server running at:${PORT}/`)
        })
    }
    catch (e) {
        console.log('error server', e)
    }
}

start()