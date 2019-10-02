const express = require('express');
const router = express.Router();
const {User,validateUser} = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const passport = require('passport');
const Joi = require('joi');
const {ensureAuthenticated} = require('../config/auth');
const {connection} = require('../startup/server');


router.get('/login',(req,res)=>{
    res.render("login");
});

router.get('/register',(req,res)=>{
    res.render("register");
});

router.get('/ucadUsers',ensureAuthenticated,(req,res)=>{
    res.render('ucadUsers',{
    
    });
})

router.get('/ucadDB',ensureAuthenticated,(req,res)=>{
    res.render('ucadDB',{
     
    });
})

router.get('/selectDB',ensureAuthenticated,(req,res)=>{
    res.render('selectDB',{
     
    });
})


router.post('/register',async(req,res)=>{
    let errors = [];
    const {error} = validateUser(req.body);
    const {name,email,password} = req.body;
    if(error) errors.push({msg:error.details[0].message});//return res.status(400).send(error.details[0].message);
    
    if(errors.length>0){
        res.render('register',{
            errors,
            email,
            password        
        });
    }
    else{
        const salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password, salt);
        var sql = `INSERT INTO user (name,email, password, isAdmin) VALUES (?,?,?,0)`;
        connection.query(sql, [name,email,hashPassword] ,function (err, result) {
            if (err){
                errors.push({msg:err.message});
                return res.render('register',{
                    errors,
                    email,
                    password        
                });
            }
            else{
                  //const token = user.generateAuthToken();
                req.flash('success_msg','You are now registered');
                res.redirect("/users/register");
            }

               
        });
        

      
    }
   
});

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/users/selectDB',
        failureRedirect:'/users/login',
        failureFlash:true
    })(req,res,next);
});


router.get('/logout',(req,res)=>{
    req.logOut();
    req.flash('success_msg','You are now logged out');
    res.redirect('/users/login');
})
module.exports = router;