const express = require('express')
const config = require('config')
var bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = config.get('port') || 5000

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//Подготавливаем роуты, в функцмм промежуточной обработки
app.use('/', require('./routers/auth.routers'))
app.use('/post', require('./routers/post.routers'))

const start = async () => {
    try {
        //соединяемся с БЗ
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(port, () => console.log(`app start ${port}`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }

}

start()
