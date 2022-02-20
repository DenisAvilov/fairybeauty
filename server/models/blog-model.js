const { Schema, model } = require('mongoose')

const BlogSchema = new Schema({
    // link: { type: String, require: true, unique: true },
    User: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String }, // String is shorthand for {type: String}
    body: { type: String },
    // comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
});

module.exports = model('Blog', BlogSchema)