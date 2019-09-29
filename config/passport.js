const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {User} = require('../models/user');
const Joi = require('joi');


module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField:'email'},(email,password,done)=>{
          const { error } = validateLogin({email,password}); 
          if (error)  return done(null,false,{message:error.details[0].message});//return res.status(400).send(error.details[0].message);
          
            // match user
            User.findOne({email})
                .then(user=>{
                    if(!user) return done(null,false,{message:'That email is not registered'});
                     //Match password
                     bcrypt.compare(password,user.password,(err,isMatch)=>{
                        if(err) throw err;
                        if(isMatch) return done(null,user);
                        else return done(null,false,{message:'password incorrect'});
                     });
                })
                .catch((err)=>console.log(err));
        })
    );
    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
    
      passport.deserializeUser((id, done)=> {
        User.findById(id,(err, user)=> {
          done(err, user);
        });
      });
}

function validateLogin(req) {
  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }).min(5).max(255).required(),
    password: Joi.string().min(6).max(255).required()
  };

  return Joi.validate(req, schema);
}