var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./models/connection');
const Trip = require('./models/trips'); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var homepageRouter = require('./routes/homepage')

var app = express();

const cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/homepage', homepageRouter);

module.exports = app;
