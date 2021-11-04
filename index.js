const mongoose = require('mongoose');
const express = require('express');
const City = require('./model/city');
const AccountRouter = require('./routes/accounts');
const PostsRouter = require('./routes/posts');
const AuthRouter = require('./routes/auth');
const AdminsRouter = require('./routes/admins');
const profileRouter = require('./routes/profile')
const app = express();
const methodOverride = require('method-override');

//connection to mongo
//mongoose.connect('mongodb://localhost/smileMk2',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
//    .then(() => console.log('Connected to MongoDB...'))
//    .catch(err => console.error('Could not connect to MongoDB...' + err));

// connection online 

// const uri = process.env.DATABASE_URL;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//client.connect(err => {
//    const collection = client.db("smile").collection("devices");
//  // perform actions on the collection object
//    client.close();
//});

console.log(process.env.DATABASE_URL);

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log('connected to MongoDB'));

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



// register for a new account
app.get('/register',async (req,res)=>{
    const cities = await City.find();
    res.render('register',{cities : cities , msg : ''});
});


app.get('/logout',(req,res)=>{
    res.redirect('/');
})

app.listen(process.env.PORT || 5000);