const { createTransport } = require('nodemailer');
const dotenv = require('dotenv'); 

async function sendEmail(from, to, subject, html ) {
    try { 
        // const accessToken = await oAuth2Client.getAccessToken()

        const transport = createTransport({
            service : 'gmail',              
            auth : {
                // type: 'OAuth2',
                user: 'email@gmail.com',
                pass: 'Admin%$#@!'
                // clientId: CLIENT_ID,
                // clientSecret: CLIENT_SECRET,
                // refreshToken: REFRESH_TOKEN,
                // accessToken: 'ya29.A0ARrdaM9ZY_LNXph81XJc2sSgYIxUjOuYCJOXWhL72dmMDF_Md_KiOwPF-Z4J31ZBrEVfq2pECKBJi87flAzVCUkdUSQIuMro7eLrrpeXQvPkKyZd3PC3sxuT5wt6-aOcS5W-s71jDzFdaE2M9FIcMxQOdxgX'
            } 
        });
 
        return new Promise((resolve, reject) => { 
            transport.sendMail({from, to, subject, html}, (err, info) => { 
                if(err) reject(err) 
    
                resolve(info) 
                // console.log(":::>> ", err)
            })
        })

    }catch(err) {
        // return err 
        console.log("Send mail error:::: ", err)
    }   
}


module.exports = sendEmail;