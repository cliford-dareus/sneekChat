const nodemailer = require('nodemailer');
const nodemailConfig = require('./nodemailConfig');

const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();
  console.log(testAccount)
  const transporter = nodemailer.createTransport(nodemailConfig);

  return transporter.sendMail({
    from: '"Sneek Coding" <max.franecki88@ethereal.email>', // sender address
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;