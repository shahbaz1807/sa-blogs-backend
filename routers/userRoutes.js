import express from "express"
import { checkOtp, sendOtp, signIn, signUp } from "../controllers/userController.js"

const userRoute = express.Router()

userRoute.post('/sign_up', signUp);
userRoute.post('/sign_in', signIn);
userRoute.post('/send_otp' , sendOtp)
userRoute.get('/check_otp' , checkOtp)

export default userRoute