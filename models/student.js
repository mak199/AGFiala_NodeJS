const mongoose = require('mongoose');
const joi = require('joi');


const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    course:{
        type:String,
        required:true
    },
    universityID:{
        type:String,
        required:true
    }
});

function validateStudent(student){
    const schema = {
        name:joi.string().min(3).required(),
        course:joi.string().min(3).required(),
        universityID:joi.string().min(6).required()
    }
    return joi.validate(student,schema);
}

const Student = mongoose.model('Student',studentSchema);

exports.Student = Student;
exports.validateStudent = validateStudent;