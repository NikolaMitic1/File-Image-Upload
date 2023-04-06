require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const fileUpload = require('express-fileupload')

//Povezivanje baze 
const connectDB = require('./db/connect');

//routers
const productRouter = require('./routes/productRoutes')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.static('./public'))
app.use(express.json())
app.use(fileUpload())

app.use('/api/v1/products' ,productRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, console.log(`Server is listening port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start()