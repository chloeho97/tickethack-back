require('dotenv').config();
const mongoose = require('mongoose');
 
const connectionString = process.env.CONNECTION_STRING;

//const connectionString = "mongodb+srv://chloeho:bUSh6Uo5RSbprfmV@cluster0.wuwvx.mongodb.net/tickethack";
 
 mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
   .then(() => console.log('Database connected'))
   .catch(error => console.error(error));

module.exports = connectionString;