const nodemailer = require('nodemailer');

async function sendEmail() {
  // Create a transporter object
  let transporter = nodemailer.createTransport({
    host: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: 'aazam.amirreza@gmail.com',
      pass: 'a9174734903'
    }
  });

  // Define the email options
  let mailOptions = {
    from: '"Amir" aazam.amirreza@gmail.com',
    to: 'ar.azam2003@gmail.com',
    subject: 'ALERT',
    text: 'We need to email       since an alert was DETECTED for:',
    html: '<p>HTML hellowww</p>'
  };

  // Send the email
  let info = await transporter.sendMail(mailOptions);
  console.log(`Message sent: ${info.messageId}`);
}

sendEmail();


  