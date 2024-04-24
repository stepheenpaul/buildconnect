const sendEmail =  require("../config/mailer"); 
   
const resetEmail = async (req, firstName, lastName, email, token) => {
  const html = `Hello ${firstName} ${lastName},
    <br/>
    <br>
    You are receiving this mail because you or someone else requested for a password change.
    <br>
    Please click on the link below to verify your email address
    <br><br>
    <a class="btn btn-primary" href="${req.headers.origin}/auth/reset-password/${token}">${req.headers.origin}/auth/reset-password/${token}</a>
    <br>
    If you did not make such request, please ignore this mail and your password will remain unchanged.
    <br/>
    <br><br>
    Kind Regards,
    <br>
    <br>
    <strong>BC</strong>
    `;  
 
  await sendEmail(
    `bc@mail.com`,
    email,
    "subject",
    html
  );
};


module.exports = resetEmail;
