const mongoose = require('mongoose');

mongoose.Promise = global.Promise ;
const DB_URL = 'mongodb://127.0.0.1/p2p';

const connectDB = async()=>{
    try {
    await mongoose.connect(DB_URL);
    console.log('Connected to Database successfully!!');
    } catch (error){
        console.log('Error connecting to MongoDB', error);
    }
};

module.exports = connectDB ; 
