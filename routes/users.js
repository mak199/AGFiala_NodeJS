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

router.get('/ucadUsers',(req,res)=>{
    if(currentUser.isAdmin==1){
        res.render('ucadUsers',{
        
        });
    }else{
        req.flash('error_msg','You are not an Admin');
        res.redirect("/users/selectDB");
    }
})

router.get('/ucadDB',(req,res)=>{
    if(currentUser.isAdmin==1){
        const {name,email,password} = req.body;
        console.log(name);
        res.render('ucadDB',{
            result: [] 
        });
    }else{
        req.flash('error_msg','You are not an Admin');
        res.redirect("/users/selectDB");
    }
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


router.post('/remove',ensureAuthenticated,async(req,res)=>{
    const {email,password,isAdmin} = req.body;

        var sql = `DELETE FROM user WHERE email = ?`;
        connection.query(sql, [email] ,function (err, result) {
            if (err){
                req.flash('error_msg',err.message);
                res.send({redirect:'/users/ucadUsers'});
            }
            else if(result.length>0){
                req.flash('success_msg','User has been Removed successfully');
                res.send({redirect:'/users/ucadUsers'});

            }
            else{
                req.flash('error_msg','Email was not found');
                res.send({redirect:'/users/ucadUsers'});
            }

            
        });


});


router.post('/add',ensureAuthenticated,async(req,res,next)=>{
    const {name,email,password,isAdmin} = req.body;
    
    console.log(currentUser.name);
    if(currentUser.isAdmin==1){
        const salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password, salt);
        var sql = `INSERT INTO user (name,email, password, isAdmin) VALUES (?,?,?,?)`;
        connection.query(sql, [name,email,hashPassword,isAdmin] ,function (err, result) {
            if (err){
                req.flash('error_msg',err.message);
                res.send({redirect:'/users/ucadUsers'});
            }
            else{
                req.flash('success_msg','User has been added successfully');
                res.send({redirect:'/users/ucadUsers'});

            }           
        });
    }
    else{
        req.flash('error_msg','You are not an Admin');
        res.send({redirect:'/users/ucadUsers'});
    }
});

router.post('/change',ensureAuthenticated,async(req,res)=>{
    const {email,password,isAdmin} = req.body;

    const salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);
    var sql = `UPDATE user SET password = ? WHERE email = ?`;
    connection.query(sql, [hashPassword,email] ,function (err, result) {
        if (err){
            req.flash('error_msg',err.message);
            res.send({redirect:'/users/ucadUsers'});
        }
        else{
            req.flash('success_msg','Password has been changed');
            res.send({redirect:'/users/ucadUsers'});

        }           
    });
   
})


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
});

module.exports = router;