import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to mongoDb");
    } catch (error) {
        console.log("error in mongodb connection", error);
    }
};

