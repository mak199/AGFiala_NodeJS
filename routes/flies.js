const mongoose = require('mongoose');
const express = require('express');
const app = express();
const router = express.Router();
const {connection} = require('../startup/server');
const {ensureAuthenticated} = require('../config/auth');

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

module.exports = router;
