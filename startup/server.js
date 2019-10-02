
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
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pak123",
  database:'agfiala'
});

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
