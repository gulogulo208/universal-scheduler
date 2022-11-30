"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendInviteEmail(first_name, email, tempPassword, inviteLink) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "BirdsEyeInvite@gmail.com",
      pass: "password",
    },
  });

  // send mail with defined transport object
  let msg = await transporter.sendMail({
    from: '"BirdsEye" <BirdsEyeInvite@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Your BirdsEye Employee Invite", // Subject line
    text: `
    Hi ${first_name}!

    Your temporary password: ${tempPassword}

    Login here: ${inviteLink}
    `, // plain text body
    html: "<b>Hello world?</b>", // html body
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
