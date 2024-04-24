const sendEmail = require("../config/mailer");

const welcomeEmail = async(req, firstName, lastName, email) => {
    const html = `Welcome to BC <strong> ${firstName} ${lastName}. </strong>  We’re very excited to have you join us!
    <br/>
    <br/>
    Welcome to builders connect
    \n another thing to say. 
    <br/>
    <br/>
    We help you collaborate, develope and find resources.
    <br><br>
    Cheers,
    <br>
    <strong>BC</strong>.

    `;

    await sendEmail(
        `email`,
        email,
        "Subject",
        html
    );
};


module.exports = welcomeEmail;