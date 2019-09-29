const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
module.exports = async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mak.khan.dev199@gmail.com',
            pass: 'fsdfsf'
        }
    });
    let mailOptions = {
        from: 'mak.khan.dev199@gmail.com',
        to: 'mak.khan199@googlemail.com',
        subject: 'Message',
        text: 'I hope this message gets delivered!'
    };

    transporter.sendMail(mailOptions,function(err,data){
        if(err){
            console.log("Error occurs");
        }
        else{
            console.log("Email sent");
        }
    });


}