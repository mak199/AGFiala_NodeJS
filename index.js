const express = require('express');
const app = express();
const students = require('./routes/students');
const users = require('./routes/users');
const flies = require('./routes/flies');
const mongoose = require('mongoose');
const expressLayout = require("express-ejs-layouts");
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const {mySQL} = require('./startup/server');
//const cool = require('cool-ascii-faces');
//const path = require('path')
 

require('./config/passport')(passport);


mongoose.connect('mongodb://localhost:/agfiala', {useNewUrlParser: true,useUnifiedTopology: true})
  .then(()=>console.log("Connected to mongoDB..."));

//app.use(express.static(path.join(__dirname, 'public')))
//app.set('views', path.join(__dirname, 'views'))
app.use(expressLayout);
app.set('view engine','ejs');
app.get('/', (req, res) => res.render('pages/index'));
//app.get('/cool', (req, res) => res.send(cool()));

// Bodyparser
app.use(express.urlencoded({extended:false}));


// Express session middleware
app.use(session({
  secret:'secret',
  resave:true,
  saveUninitialized:true
}));

var sess;
app.get('/',function(req,res){
    sess=req.session;
    sess.email; // equivalent to $_SESSION['email'] in PHP.
});


app.use(passport.initialize());
app.use(passport.session());

mySQL();



//Connect flash
app.use(flash());
// Global Variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


app.use(express.json());
app.use('/students',students);
app.use('/users',users);
app.use('/flies',flies);



//const port = process.env.PORT || 3000;
const port = 3000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;