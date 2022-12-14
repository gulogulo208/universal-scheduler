"use strict";
const nodemailer = require("nodemailer");

require("dotenv").config();

// async..await is not allowed in global scope, must use a wrapper
async function sendInviteEmail(first_name, email, tempPassword, inviteLink) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
      user: "birdseyeinvite@outlook.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  let msg = await transporter.sendMail({
    from: '"BirdsEye Invite" <birdseyeinvite@outlook.com>', // sender address
    to: email, // list of receivers
    subject: "Your BirdsEye Employee Invite", // Subject line
    text: `
    Hi ${first_name}!

    Your temporary password: ${tempPassword}
    ** After you login, click the settings icon in the top right corner to change your password **

    Login here: ${inviteLink}
    `, // plain text body
    html: `
    <div>
    Hi ${first_name}!<br>
    <br>Your temporary password: ${tempPassword}<br>
    ** After you login, click the settings icon in the top right corner to change your password **<br>
    <br>Login here: ${inviteLink}
    </div>
    `, // html body
  });

  transporter.sendMail(msg, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }

    console.log(info.response);
  });
}

module.exports = { sendInviteEmail };
