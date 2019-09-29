const mongoose = require('mongoose');
const joi = require('joi');
const jwt = require("jsonwebtoken");
const config = require('config');

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
      {
        _id: this._id,
        name: this.name,
        password: this.password,
        isAdmin: this.isAdmin
      },
      config.get("jwtPrivateKey")
    );
    return token;
  };
  

const User = mongoose.model('User',userSchema);

const validateUser = function(user){
    const schema = {
        email:joi.string().email({ minDomainAtoms: 2 }).required().min(3).max(255),
        name:joi.string().required().min(3).max(255),
        password:joi.string().required().min(6).max(255),
        password2:joi.string().required().min(6).max(255)
    }
    return joi.validate(user,schema);
}

exports.User = User;
exports.validateUser = validateUser;