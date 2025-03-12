require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./models/connection');
const Trip = require('./models/trips');

var searchRouter = require('./routes/search')
var cartRouter = require('./routes/cart')
var bookingRouter = require('./routes/booking')


var app = express();

const cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/search', searchRouter);
app.use('/cart', cartRouter);
app.use('/booking', bookingRouter);

module.exports = app;
