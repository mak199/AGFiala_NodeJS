const express = require('express');
const router = express.Router();
const path = require('path');




router.get('/login',(req,res)=>{
    res.render('login',{
     
    });
})


router.post('/login',(req,res)=>{
   const {username,password} = req.body;
   if(!username||!password) errors.push({msg:'Please fill in all fields'});

   res.status(200).send(username);
})

router.get('/register',(req,res)=>{
    res.render('register',{
     
    });
})

router.post('/register',(req,res)=>{
    const {username,password} = req.body;
   if(!username||!password) errors.push({msg:'Please fill in all fields'});

   res.status(200).send(username);
})

module.exports = router;