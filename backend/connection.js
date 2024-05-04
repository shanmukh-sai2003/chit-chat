const mongoose = require('mongoose');
require('dotenv').config();

async function makeDbConnection() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('connection established...');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = makeDbConnection;