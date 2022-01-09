// Один файл это одна модель
const { Schema, model, Types } = require('mongoose')
// В объект schema описываем поля для пользователя
const schema = new Schema({
    // from: { type: String },
    to: { type: String, require: true, unique: true },
    data: { type: Date, default: Date.now },
    // clicks: { type: Number, default: 0 },
    title: { type: String },
    contant: { type: String },
    likes: { type: Number, default: 0 },
    owner: { type: Types.ObjectId, ref: 'User' }

});

//Даем название нашей модели, схема по которой он работает это объект schema
module.exports = model('Post', schema);