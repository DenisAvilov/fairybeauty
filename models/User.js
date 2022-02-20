// Один файл это одна модель
const mongoose = require('mongoose')
// В объект schema описываем поля для пользователя
const schema = new mongoose.Schema({
    firstName: {
        type: String,

    },
    lastName: {
        type: String,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    subscription: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        min: [6, 'Too few eggs'],
        //у каждого пользователя будут свои собственные данные
        // Привязываемся к будующей модели которую создадим Post       
    },
    subscription: { type: Boolean, default: false },
    post: [{ type: mongoose.Types.ObjectId, ref: 'Post' }]

});

//Даем название нашей модели, схема по которой он работает это объект schema
const User = mongoose.model('User', schema);

// User это екземпляр модели и называется документ
module.exports = User                  