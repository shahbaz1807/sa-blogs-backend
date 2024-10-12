import userModel from "../models/userSchama.js";
import nodemailer from "nodemailer"
import bcrypt from "bcrypt"

let otpCode;


export const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.send({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const createModel = await userModel.create({
            name: name,
            email: email,
            password: hashedPassword
        });
        res.status(201).send(createModel);
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong');
    }
};

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existUser = await userModel.findOne({ email: email })
        if (!existUser) {
            return res.json({ message: "User not found" })
        }

        const matchPassword = await bcrypt.compare(password, existUser.password)

        if (!matchPassword) {
            return res.json({ message: "Wrong password" })
        }

        res.send(existUser)

    } catch (error) {
        console.log(error);
    }
}

export const sendOtp = async (req, res) => {
    otpCode = Math.floor(Math.random() * 900000);

    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "shahbazansari8199@gmail.com",
            pass: 'nyaj zfxg ktjr iztq'
        },
    })
    const info = await transporter.sendMail({
        from: 'shahbazansari8199@gmail.com',
        to: `${req.body.email}`,
        subject: `${otpCode} is your sa blogs otp code`,
        text: `your otp  is ${parseInt(otpCode)}`,
    })

    console.log("Message send:%s", info.messageId);
    console.log(req.body.email);
    res.send(info)
}

export const checkOtp = async (req, res) => {
    try {
        res.json({ code: otpCode })
    } catch (error) {
        console.log(error);
    }
}

