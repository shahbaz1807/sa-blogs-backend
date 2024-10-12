import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        mongoose.connect(process.env.MOGO_DB_URL)
        console.log("Mongodb is connected successfully");
    } catch (error) {
        console.log("Error connecting to MongoDB ", error );
    }
}

export default connectMongoDB