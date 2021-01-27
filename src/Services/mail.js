const nodemailer = require("nodemailer");

module.exports = {
  async sendMail(to, subject, text, html) {
    const sender = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      service: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const email = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    };

    const sendEmail = await sender.sendMail(email);

    return sendEmail;
  },
};
