import nodemailer from "nodemailer";
async function mailSender(email, title, body) {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port:587,
      auth: {
        user: "norhan3182001@gmail.com",
        pass: "xsmtpsib-d24513b024f2ae41331979a0b9c864c1e541390ab6cd8868d358aded88191067-PHjYdbrQNygvakpE",
      },
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: "admin@paeep.ps",
      to: email,
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log(error.message);
  }
}
export default { mailSender };
