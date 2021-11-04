const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Account = require('../model/account')
const Post = require('../model/post');
const Category = require('../model/category');



router.get('/:username',async (req,res)=>{
    const account = await Account.findOne({username:req.params.username});
    let categories = await Category.find();
    let posts = await Post.find({authorUsername : req.params.username});
    res.render('profile',{categories : categories ,posts : posts, username : account.username ,
                        autherPhonenumber : account.phoneNumber , authorAddress : account.address ,
                        authorBadge : account.badge , authorCity : account.city , 
                        numberOfDonation : account.numberOfDonation , badge : account.badge});
});

router.post('/:username', async (req, res,next) => {
    req.post = new Post();
    let post = req.post;
    post.name = req.body.name;
    post.description = req.body.description;
    post.category = req.body.category;
    post.authorUsername = req.body.authorUsername;
    post.authorAddress = req.body.authorAddress;
    post.authorBadge = req.body.authorBadge;
    post.authorPhoneNumber = req.body.authorPhoneNumber;
    post.authorCity = req.body.authorCity;
    
    
    try{
        post = await post.save();
        let account = await Account.findOne({username:post.authorUsername});
        let postA = await Post.find({authorUsername : req.params.username});
        account.numberOfDonation = account.numberOfDonation +1;

        if(account.numberOfDonation > 2 && account.numberOfDonation < 10){
            account.badge = 'starter';
            postA.authorBadge = 'starter';
        }
        else if(account.numberOfDonation > 10 && account.numberOfDonation < 15){
            account.badge = 'regular';
            postA.authorBadge = 'regular';
        }
        else if(account.numberOfDonation > 20){
            account.badge = 'hero';
            postA.authorBadge = 'hero';
        }
        account = await account.save();
        res.redirect(`/profile/${req.body.authorUsername}`);
            
    }catch(err){
        console.log(err);
        res.send('could not add the donation' + err);
    }
    next();

});

router.delete('/:username', async (req,res,next)=>{
    try{
        await Post.findByIdAndDelete(req.body.id);
        res.send('post deleted successfully')
        
    }catch(err){
        console.log(err);
        res.send('could not delete post' + err);
    }
    next()
});



module.exports = router;