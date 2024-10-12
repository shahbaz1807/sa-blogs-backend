import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import connectMongoDB from "./config/db.js"
import userRoute from "./routers/userRoutes.js"

dotenv.config()
connectMongoDB()


const app = express()
const port = process.env.PORT || 9000

app.use(cors())
app.use(bodyParser.json())

app.get("/" , (req , res) => {
    res.send('sa blogs')
})


app.use('/user' , userRoute)


app.listen(port , () =>{
    console.log(`your server is running on port ${port}`);
})