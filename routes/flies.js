const mongoose = require('mongoose');
const express = require('express');
const app = express();
const router = express.Router();
const {connection} = require('../startup/server');
const {ensureAuthenticated} = require('../config/auth');

router.post('/updateDBMenu',(req,res)=>{
    let {table} = req.body;    
    if(table!='Default'){
        var sql = "SELECT * FROM featuresoftable WHERE TableName="+"'"+table.replace(/\s/g, '')+"'";
        let errors = [];
        connection.query(sql ,function (err, result) {
            if (err){
                errors.push({msg:err.message});
            
            }
            else{
                res.send({result:result});
            }
        });
    }
  
})

router.get('/flyStocks',ensureAuthenticated,async(req,res)=>{
    var sql = `SELECT * FROM flystocks`;
    let errors = [];
    connection.query(sql ,function (err, result) {
        if (err){
            errors.push({msg:err.message});
        
        }
        else{
            return res.render('displayFlyStocks',{ 
                data:result
            });
        }
    });

});

router.get('/primaryStocks',ensureAuthenticated,async(req,res)=>{
    var sql = `SELECT * FROM primaryantibodies`;
    let errors = [];
    connection.query(sql ,function (err, result) {
        if (err){
            errors.push({msg:err.message});
        
        }
        else{
            return res.render('displayPrimary',{ 
                data:result
            });
        }
    });

});

router.get('/secondaryStocks',ensureAuthenticated,async(req,res)=>{
    var sql = `SELECT * FROM secondaryantibodies`;
    let errors = [];
    connection.query(sql ,function (err, result) {
        if (err){
            errors.push({msg:err.message});
        
        }
        else{
            return res.render('displaySecondary',{ 
                data:result
            });
        }
    });

});

router.post('/update',async(req,res)=>{
    let {table,setAttr,setVal,whereVal} = req.body;
    table = table.toLowerCase().replace(/\s/g, '').replace(/\'/gi,'');

    //var sql = `UPDATE ? SET [?] = [?] WHERE ID = [?]`;
    var sql = "UPDATE "+table+" SET "+"`"+setAttr+"`"+"="+"'"+setVal+"'"+" WHERE ID = "+whereVal;
    // var sql = "UPDATE flystocks SET `Short Description` = 'Works' WHERE ID = 2";
    let errors = [];
    console.log({table,setAttr,setVal,whereVal});
    console.log(sql);
    connection.query(sql ,function (err, result) {
        if (err){
            req.flash('error_msg',err.message);
            res.send({redirect:'/users/ucadDB'});
        }
        else{
            req.flash('success_msg','DB has been changed');
            res.send({redirect:'/users/ucadDB'});

        }  
    });

});

module.exports = router;
