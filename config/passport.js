const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {User} = require('../models/user');
const Joi = require('joi');
const {connection} = require('../startup/server');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField:'email'},(email,password,done)=>{
          const { error } = validateLogin({email,password}); 
          if (error)  return done(null,false,{message:error.details[0].message});//return res.status(400).send(error.details[0].message);
          
          var sql = "SELECT * FROM user WHERE email = ?";
          connection.query(sql,[email],function(err, result) {
            if (err){
              return done(err);//throw err;
            }
            else{
              bcrypt.compare(password,result[0].password,(err,isMatch)=>{
              if(err) throw err;
              if(isMatch) return done(null,result[0]);
              else return done(null,false,{message:'password incorrect'});
             });
            }
          });
              
        })
    );
    passport.serializeUser((user, done)=> {
        done(null, user.email);
      });
    
      passport.deserializeUser((email, done)=> {       
        connection.query("SELECT * FROM user WHERE email = ?",[email],function(err,rows){	
          done(err, rows[0]);
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