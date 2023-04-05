require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

//Povezivanje baze 
const connectDB = require('./db/connect');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const { log } = require('console');


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = 5000

const start = async ( ) => {
    try {
        await connectDB(process.env.MONGO_URL)
    } catch (error) {
        console.log(error);
    }
}

start()