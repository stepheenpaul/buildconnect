const sendEmail =  require("../config/mailer"); 
 
const verifyUserEmail = async (req, email, firstName, token) => {
  const html = `Hello ${firstName},
    <br/>
    <br>
    Thank you for your registration. 
    <br/>
    <br/>
    Please click on the link below to verify your email address
    <br><br>
    <a class="btn btn-primary" href="${req.headers.origin}/account/verify-user/${token}">${req.headers.origin}/account/verify-user/${token}</a>
    <br><br>
    Cheers,
    <br>
    <strong>BC</strong>

    `;

  await sendEmail(
    `support@mail.com`,
    email,
    "SHAA: Please verify your account",
    html
  );
  console.log('I dey here oo', email, token)
};


module.exports = verifyUserEmail;
