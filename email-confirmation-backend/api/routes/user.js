
const express = require('express');
const User=require("../models/user");
const mongoose=require("mongoose");
const router = express.Router();
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');

// route to create a new user
router.post("/signup_user", (req,res,next)=>{
    const secretToken = randomstring.generate()
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        secretToken: secretToken,
        isActive: false
    });
    user.save().then(result =>{
        console.log(result);
    })
    .catch(err=> console.log(err));
    res.status(201).json({
        message: 'User created but inactive!'
    });
    
    //creating nodemailer transporter for sending confirmation link mail
    let transporter = nodemailer.createTransport({

        service: 'gmail', // using gmail as mail service
        // host: "",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        auth: {
          user: '', // Your Email id from where email is to be sent
          pass: '' // Your password for the above email id
        },
        tls: {
            rejectUnauthorized: false
        }
      });
    
      confirmURL = 'http://localhost:4200/confirmation/'+secretToken;
      // setup email data with unicode symbols
      let mailOptions = {
        from: '"Confirm your email address" <>', // sender address in brackets
        to: req.body.email, // list of receivers
        subject: "Confirm your email account", // Subject line
        text: "", // plain text body
        html: "<a href="+confirmURL+">"+confirmURL+"</a>" // html body
      };
    
      // send mail with defined transport object
     transporter.sendMail(mailOptions, (error, info) => {
         if(error) {
             return console.log(error);
         }
         console.log("Message sent: %s", info.messageId);
         // Preview only available when sending through an Ethereal account
         console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

     });
    
});
// route for getting user token
router.get('/userToken/:token', (req, res, next) => {
    const token = req.params.token;
    User.find({
        'secretToken':token
    })
    .exec()
    .then(doc =>{
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});
//route for checking login credentials
router.post('/login/', (req, res, next) => {
    const email = req.body.email;
    console.log(req.body.email);
    User.find({
        'email':email,
        'password':req.body.password
    })
    .exec()
    .then(doc =>{
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});
//route for activating account
router.put('/activate/:token', (req, res, next) =>{
    const token=req.params.token;
    console.log("Token is",token);
    User.findOneAndUpdate( {secretToken:token}, {
        isActive: req.body.isActive
    }).then( result=>{
      console.log(result);
        res.status(200).json({
            message: "Account Activated"
        });
    });

});

module.exports = router;