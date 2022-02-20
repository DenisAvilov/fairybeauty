const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: [{ type: String, ref: 'Role' }],
    //подтверждение почты
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    subscription: { type: Boolean, default: false }
})

module.exports = model('User', UserSchema) 