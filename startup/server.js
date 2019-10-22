
var mysql = require('mysql');
/*var con = mysql.createConnection({
  host: "localhost",
  password: "pak123",
  database:'agfiala'
});

module.exports = function(){
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE  IF NOT EXISTS agfiala", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });

    var sql = "CREATE TABLE IF NOT EXISTS user (username VARCHAR(255), password VARCHAR(255), isAdmin Boolean,PRIMARY KEY(username,password))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });      
  });

    
  
    
}
*/
if(process.env.server=="local"){
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pak123",
    database:'agfiala'
  });
}
else{
  var con = mysql.createConnection({
    host: "us-cdbr-iron-east-05.cleardb.net",
    user: "b3b4cb3bf75ee1",
    password: "0f2c3aee",
    database:'heroku_b1c36f8732994cd'
  });
  console.log("Remote connection");
}

exports.mySQL = function(){
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to mysql!");
    /*con.query("CREATE DATABASE IF NOT EXISTS agfiala", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
    */
    var sql = "CREATE TABLE IF NOT EXISTS user (name VARCHAR(255),email VARCHAR(255), password VARCHAR(255), isAdmin Boolean,PRIMARY KEY(email))";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
    
  });
}

exports.connection = con;
