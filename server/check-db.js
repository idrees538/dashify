const mongoose = require('mongoose');
const dotenv = require('dotenv');
const TimeBlock = require('./modules/calendar/timeBlock.model');
const connectDB = require('./config/db');

dotenv.config();

const checkBlocks = async () => {
    try {
        await connectDB();
        const count = await TimeBlock.countDocuments();
        const blocks = await TimeBlock.find();
        console.log(`Count: ${count}`);
        console.log('Blocks:', JSON.stringify(blocks, null, 2));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkBlocks();
