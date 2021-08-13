const { Schema, model } = require('mongoose')

// const Profile = required('./Profile')

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        maxlength: 15,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: Schema.Types.ObjectID,
        ref: 'Profile'
    },
    profilePics: {
        type: String,
        default:'/uploads/default.png'
    }
}, {
    timestamps: true
})

const User = model('User', userSchema)

module.exports = User