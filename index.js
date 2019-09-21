const express = require('express');
const app = express();
const user = require('./routes/user');
const expressLayout = require("express-ejs-layouts");

app.use(expressLayout);
app.set('view engine','ejs');

// Bodyparser
app.use(express.urlencoded({extended:false}));


app.use(express.json());
app.use('/users',user);



const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);