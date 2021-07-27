const nodemailer = require('nodemailer')
require('dotenv').config();

const EMAIL = process.env.EMAIL
const PASS = process.env.EMAIL_PASS


function sendEmail(toAddress, id){

const message = `
Your medically account has been successfully created.
Here's your id : ${id}
Your doctor can use this id to add and access your medical records.
`


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: PASS
    }
  });
  
  const mailOptions = {
    from: 'Medically',
    to: toAddress,
    subject: 'Your Medically Patient id',
    text: message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendEmail