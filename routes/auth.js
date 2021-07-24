const Account = require('../model/account');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    

    let account = await Account.findOne({email:req.body.email});
    if(!account){
        return res.status(400).send('invalid email or password');
    }

    const validPassword = await bcrypt.compare(req.body.password, account.password);
    if(!validPassword){
        return res.status(400).send('invalid email or password');
    }

    if(!account.isAdmin)
        res.redirect(`/profile/${account.username}`);
    else
        res.redirect('/Admins');
});

module.exports = router; 