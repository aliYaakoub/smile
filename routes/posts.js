const Post = require('../model/post');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const City = require('../model/city');
const Category = require('../model/category');
//const Account = require('../model/account');
//const city = require('../model/city');

// router.get('/', async (req, res) => {
//     const cities = await City.find();
//     const categories = await Category.find();
//     const posts = await Post.find();
//     res.render('posts',{posts : posts , cities : cities , categories : categories});
//     res.redirect(`/postsTable`);
// });

// router.get(`postsTable`, async (req,res)=>{
//     const cities = await City.find();
//     const categories = await Category.find();
//     const posts = await Post.find({authorCity : req.params.city , category : req.params.category});
//     res.render('postsTable',{posts : posts , cities : cities , categories : categories});
// });


router.post('/postsForm',async (req,res)=>{
    //res.redirect('/postsTable')
    if (req.body.city === 'all' && req.body.category === 'all'){
        const posts = await Post.find();
        res.render('postsTable',{posts : posts })
    } 
    else if (req.body.city === 'all'){
        const posts = await Post.find({category : req.body.category});
        res.render('postsTable',{posts : posts })
    }else if (req.body.category === 'all'){
        const posts = await Post.find({authorCity : req.body.city});
        res.render('postsTable',{posts : posts})
    }
    else{
        const posts = await Post.find({authorCity : req.body.city , category : req.body.category});
        res.render('postsTable',{posts : posts })
    }
});

router.get('/posts', async  (req,res)=>{
        const cities = await City.find();
        const categories = await Category.find();
        const posts = await Post.find();
        res.render('posts',{posts : posts, cities : cities , categories : categories});
});

//router.get('/postsTable',async (req,res)=>{
//     const posts = await Post.find({authorCity : req.body.City});
//     res.render('postsTable',{posts : posts })
//});

module.exports = router;