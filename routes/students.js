const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Student,validateStudent} = require('../models/student');
const auth = require('../middleware/auth');


router.get('/',async(req,res)=>{
    const student = await Student.find()
        .select('-__v')
        .sort('name');
    res.status(200).send(student);
    
});

router.post('/',auth,async(req,res)=>{
    const {error} = validateStudent(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let student = new Student({
        name:req.body.name,
        course:req.body.course,
        universityID:req.body.universityID
    });
    student = await student.save();
    res.send(student);
});

module.exports = router;