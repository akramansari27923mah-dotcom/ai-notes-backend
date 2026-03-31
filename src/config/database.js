import mongoose from "mongoose";
const mongoUri = process.env.MONGO_URI

if (!mongoUri) {
    throw new Error("Mongo uri is not defined");
}

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri)
        console.log('DB CONNECTED SUCCESSFULLY');
    }
    catch (err) {
        console.log('DB ERROR', err);
        process.exit(1)
    }
}

export default connectDB