const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Account = require('../model/account')
const Post = require('../model/post');
const account = require('../model/account');
const Category = require('../model/category');

router.get('/',async (req,res)=>{
    const account = await Account.find();
    let posts = await Post.find();
    res.render('admins',{posts : posts , accounts : account , username : account.username , donations : account.numberOfDonations ,
                        autherPhonenumber : account.phoneNumber , authorAddress : account.address ,
                        authorCity : account.city});
});

router.delete('/', async (req,res,next)=>{
    try{
        await Post.findByIdAndDelete(req.body.id);
        await Account.findByIdAndDelete(req.body.id);
        res.send('deleted successfully');
        
    }catch(err){
        console.log(err);
        res.send('could not delete' + err);
    }
    next()
});

module.exports = router;