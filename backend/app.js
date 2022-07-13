const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser')
const fileUpload = require ('express-fileupload')


const errorMiddleware = require('./middlewares/errors');


app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true}));
app.use(cookieParser())
app.use(fileUpload());


//Import all routes
const animals = require('./routes/animal');
const auth = require('./routes/auth');
const adoption = require('./routes/adoption');

app.use('/api/v1', animals)
app.use('/api/v1', auth)
app.use('/api/v1', adoption)

//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app