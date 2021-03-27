const nodemailer = require("nodemailer");
require('dotenv').config()

module.exports.mailer = (email, token) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAIL_PASS
        }
    });

        const link = `<a href="http://localhost:3000/resetPassword/${token}">Click Here</a>`
        var mailOption = {
            from: process.env.MAIL,
            to: email,
            subject: "nodemailer",
            html: 'Please click on the following link for reset password   ' + link
        }
        // verify connection configuration
    transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            return error;
        }
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
}