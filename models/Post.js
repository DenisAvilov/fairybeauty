// Один файл это одна модель
const mongoose = require('mongoose')
// В объект schema описываем поля для пользователя
const schema = new mongoose.Schema({
    post: [{
        type: String,
    }],


});

//Даем название нашей модели, схема по которой он работает это объект schema
const Post = mongoose.model('Post', schema);

// User это екземпляр модели и называется документ
module.exports = Post                  