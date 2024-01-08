// Sends and email thanking the user for signing up
export const sendSignUpEmail = async (email, username) => {

    const mailObject = {
        to: email,
        subject: 'Thanks for signing up!',
        text: `Welcome to Kurstie's Kookies ${username}!`,
    };

    const response = await fetch ('/api/mail/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mailObject),
    });

    if (response.ok) {
        console.log('Email sent');
    } else {
        console.log('Failed to send email');
    }
};