import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function makeDbConnection() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('connection established...');
    } catch (error) {
        console.log(error.message);
    }
}

export default makeDbConnection;