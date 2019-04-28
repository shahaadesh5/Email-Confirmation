const express = require('express');
const app = express();
const mongoose = require('mongoose'); // for establishing connection with mongoDB Atlas and accessing data on MongoDB
const nodemailer = require('nodemailer'); //for sending mails
const bodyParser = require('body-parser');  // for getting data from front end post request service


//calling user route
const userRoutes = require('./api/routes/user');

// setting limit for body parser. You can change it to whatever required
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());

//setting up the CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      if(req.method === 'OPTIONS'){
          res.header('Access-Control-Allow-Methods', 'PUT,POST, PATCH, DELETE');
          return res.status(200).json({}); 
      }
      next();
});
// using the user routes on server
app.use('/user', userRoutes);
//setting up MONGODB ATLAS connection
mongoose.connect('YOUR MONGODB ATLAS CONNECTION STRING', { useNewUrlParser: true });


module.exports = app;