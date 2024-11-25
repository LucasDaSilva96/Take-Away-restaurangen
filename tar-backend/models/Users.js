const mongoose = require('mongoose');
const uuid = require('uuid');


const userSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuid.v4()
    },
    email: {
        type: String,
        required: [true, "Valid email is required"]
    },
    password: {
        type: String,
        required: [true, "Valid password is required"]
    },
    role: {
        type: String,
        default: "Customer"
    },
    orders: []
},{collection: "Users"})


const User = mongoose.model("User", userSchema)

module.exports = User