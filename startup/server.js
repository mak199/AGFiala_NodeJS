
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database:'agfiala'
});
exports.mySQL = function(){
    
  
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      /*var sql = "CREATE TABLE user (username VARCHAR(255), password VARCHAR(255), isAdmin Boolean,PRIMARY KEY(username,password))";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });*/
      
    });
    
}
exports.connection = con;

