import nodemailer from 'nodemailer';
// import { google } from 'googleapis';
import config from '../../config';

// const OAuth2 = google.auth.OAuth2;
// const oauth2Client = new OAuth2(
//   config.GMAIL.clientID,
//   config.GMAIL.clientSecret,
//   config.GMAIL.redirectURL
// );
//
// oauth2Client.setCredentials({
//   refresh_token: config.GMAIL.refreshToken
// });

const emailTemplates = {
  newUser: `
    <H1>Test</H1>
  `,
  recoverPassword: ``,
  welcomeMail: ``
}

const sendActivationEmail = async (user) => {
  try{
    // const responseData = await oauth2Client.getAccessToken();
    // const accesToken = responseData.token;
    // const smtpTransport = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     type: 'OAuth2',
    //     user: config.GMAIL.emailUser,
    //     clientSecret: config.GMAIL.clientSecret,
    //     refreshToken: config.GMAIL.refreshToken,
    //     accesToken: accesToken
    //   }
    // });
    const mailOptions = {
      from: `Omni Server <${config.MAILGUN.auth.user}>`,
      to: user.email,
      subject: 'Please, confirm your email to activate your account.',
      generateTextFromHTML: true,
      html: emailTemplates.newUser
    }
    const smtpTransport = nodemailer.createTransport(config.MAILGUN);
    const info = await smtpTransport.sendMail(mailOptions);
    console.log(info);
  } catch(error) {
    console.log(error);
  }
}

export default { sendActivationEmail }
