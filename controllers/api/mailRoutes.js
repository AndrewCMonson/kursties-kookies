const router = require('express').Router();
const nodeMailer = require('nodemailer');

router.post('/send', async (req, res) => {
    const { to, subject, text, } = req.body;

    const mailObject = {
        from: process.env.MAIL_USERNAME,
        to,
        subject,
        text,
    };

    try {
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
                clientId: process.env.OAUTH_CLIENT_ID,
                clientSecret: process.env.OAUTH_CLIENT_SECRET,
                refreshToken: process.env.OAUTH_REFRESH_TOKEN
            },
        });

        const info = await transporter.sendMail(mailObject);

        res.status(200).json(info);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;