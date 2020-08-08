import nodemailer from 'nodemailer';
import setMailBody from './mailTemplates';

// TODO: check if unit tests needed for this?
export default (emailInfo, type) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const mailData = {
    from: '"Dev Team Tool" <dteamtool@gmail.com>',
    to: emailInfo.recipient, // list of receivers
    subject: emailInfo.subject,
    html: setMailBody(emailInfo, type),
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    return console.log(`Email sent: ${info.response}`);
  });
};
