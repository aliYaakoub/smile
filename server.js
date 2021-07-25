const mongoose = require('mongoose');
const express = require('express');
//const session = require('express-session');
//const passport = require('passport');
//const localStrategy = require('passport-local').Strategy;
const City = require('./model/city');
const Category = require('./model/category');
const Account = require('./model/account');
const AccountRouter = require('./routes/accounts');
const PostsRouter = require('./routes/posts');
const AuthRouter = require('./routes/auth');
const AdminsRouter = require('./routes/admins');
const profileRouter = require('./routes/profile')
const app = express();
const bcrypt = require('bcrypt');
const methodOverride = require('method-override');
const Post = require('./model/post')

const { MongoClient } = require('mongodb');

const accounts = require('./routes/accounts');
const posts = require('./routes/posts');
const variable = require('./model/city');

//connection to mongo
//mongoose.connect('mongodb://localhost/smileMk2',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
//    .then(() => console.log('Connected to MongoDB...'))
//    .catch(err => console.error('Could not connect to MongoDB...' + err));

// connection online 

const uri = "mongodb+srv://smile_official:smile_official@smile.pfcn2.mongodb.net/smile?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//client.connect(err => {
//    const collection = client.db("smile").collection("devices");
//  // perform actions on the collection object
//    client.close();
//});

const connectDB = async ()=>{
    await mongoose.connect(uri ,{useNewUrlParser: true, useUnifiedTopology: true})
    console.log('connected to the database ...');
}
connectDB();

app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public/'));
app.use(express.static('public'));
app.use(methodOverride('_method'));


//routes
app.use('/register',AccountRouter);
app.use('/',PostsRouter);
app.use('/login',AuthRouter);
app.use('/profile',profileRouter);
app.use('/admins',AdminsRouter);


// open the first page
app.get('/',async (req,res)=>{
    res.render('index');
});

app.get('/article1',(req,res)=>{
    res.render('articles/article1');
});
app.get('/article2',(req,res)=>{
    res.render('articles/article2');
});
app.get('/article3',(req,res)=>{
    res.render('articles/article3');
});
app.get('/article4',(req,res)=>{
    res.render('articles/article4');
});
app.get('/article5',(req,res)=>{
    res.render('articles/article5');
});
app.get('/article6',(req,res)=>{
    res.render('articles/article6');
});

//go to the login page
app.get('/login',(req,res)=>{
    res.render('login' , {msg : ''});
})


//go to the posts page
//app.get('/posts',async (req,res)=>{
//});


// register for a new account
app.get('/register',async (req,res)=>{
    const cities = await City.find();
    res.render('register',{cities : cities , msg : ''});
});

//app.post('/login',(passport.authenticate('local',{
//    successRedirect : '/profile',
//    failureRedirect : '/login?error=true'
//})));

app.get('/logout',(req,res)=>{
    res.redirect('/');
})

//var nodemailer = require('nodemailer');
//
//let transporter = nodemailer.createTransport({
//      service: 'gmail',
//      auth: {
//        type: 'OAuth2',
//        user: process.env.MAIL_USERNAME,
//        pass: process.env.MAIL_PASSWORD,
//        clientId: process.env.OAUTH_CLIENTID,
//        clientSecret: process.env.OAUTH_CLIENT_SECRET,
//        refreshToken: process.env.OAUTH_REFRESH_TOKEN
//      }
//    });
//
//var mailOptions = {
//  from: 'smile.offical.21@gmail.com',
//  to: 'eagleyes2015@gmail.com',
//  subject: 'Sending Email using Node.js',
//  text: 'That was easy!'
//};
//
//transporter.sendMail(mailOptions, function(error, info){
//  if (error) {
//    console.log(error);
//  } else {
//    console.log('Email sent: ' + info.response);
//  }
//});

app.listen(5000);