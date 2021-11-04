const Post = require('../model/post');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const City = require('../model/city');
const Category = require('../model/category');
router.post('/postsForm',async (req,res)=>{
    if (req.body.city === 'all' && req.body.category === 'all'){
        const posts = await Post.find().sort('date');
        res.render('postsTable',{posts : posts });
    } 
    else if (req.body.city === 'all'){
        const posts = await Post.find({category : req.body.category}).sort('date');
        res.render('postsTable',{posts : posts });
    }else if (req.body.category === 'all'){
        const posts = await Post.find({authorCity : req.body.city}).sort('date');
        res.render('postsTable',{posts : posts});
    }
    else{
        const posts = await Post.find({authorCity : req.body.city , category : req.body.category}).sort('date');
        res.render('postsTable',{posts : posts });
    }
});

router.get('/posts', async  (req,res)=>{
        const cities = await City.find();
        const categories = await Category.find();
        const posts = await Post.find();
        res.render('posts',{posts : posts, cities : cities , categories : categories});
});


module.exports = router;