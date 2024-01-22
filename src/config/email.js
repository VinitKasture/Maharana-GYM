const nodemailer = require("nodemailer");

async function sendEmail(email, subject, html) {
  const { ADMIN_ID, AUTH_PASSWORD } = process.env;
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: ADMIN_ID,
        pass: AUTH_PASSWORD,
      },
    });

    let message = {
      from: ADMIN_ID,
      to: email,
      subject: subject,
      html: html,
    };

    let info = await transporter.sendMail(message);
    console.log("Message sent successfully as %s", info.messageId);

    return;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

module.exports = { sendEmail };
