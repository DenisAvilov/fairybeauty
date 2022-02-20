// Один файл это одна модель
const { Schema, model } = require('mongoose')
// В объект schema описываем поля для пользователя
const schema = new Schema({
    body: {
        type: String,
        required: true
    },
    postOwner: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    chldren: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    createdData: {
        type: Date,
        default: Date.now
    },


});

module.exports = model('Comment', schema);
// https://www.youtube.com/watch?v=kyNGGFZduXg&t=2602s