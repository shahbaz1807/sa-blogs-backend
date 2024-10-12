import mongoose from "mongoose";

const userSchama = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
        },
})

const userModel = new mongoose.model("user", userSchama)

export default userModel