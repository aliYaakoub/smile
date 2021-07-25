const Account = require('../model/account');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const City = require('../model/city')

router.post('/', async (req, res,next) => {
    req.account = new Account();
    next();
},saveAccountAndRedirect('register'));


function saveAccountAndRedirect(path){
    return async (req,res)=>{
        let account = req.account;
        account.name = req.body.name;
        account.email = req.body.email;
        account.password = req.body.password;
        account.username = req.body.username;
        account.address = req.body.address;
        account.phoneNumber = req.body.phonenumber;
        account.city = req.body.city;
                
        const salt = await bcrypt.genSalt(10);
        account.password = await bcrypt.hash(account.password,salt);
        try{
            account = await account.save();
            res.redirect('/login');
        }catch(err){
            let username = await Account.findOne({username:req.body.username});
            if(username){
                //return res.status(400).send('username already exist');
                const cities = await City.find();
                return res.render('register',{cities : cities , msg : 'username already exist'});
            }
            let email = await Account.findOne({email:req.body.email});
            if(email){
                //return res.status(400).send('email already registered');
                const cities = await City.find();
                return res.render('register',{cities : cities , msg : 'email already exist'});
            }
            console.log(err);
            res.redirect(`/${path}`);
        }
    }
}

module.exports = router;