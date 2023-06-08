const {
    sendMail,
    addToMailingList,
    removeFromMailingList,
} = require("../utils/emailHelpers");

async function signupEmail(email, code) {
    const options = {
        to: email,
        subject: "Your one time password for Tutor AI",
        template: "signup",
        variables: {
            code,
        },
    };

    await sendMail(options);
}

async function resetPasswordEmail(email, token) {
    const options = {
        to: email,
        subject: "Reset Password",
        template: "forgot-password",
        variables: {
            token,
        },
    };
    await sendMail(options);
}
async function welcomeNotification({ email, name }) {
    const options = {
        to: email,
        subject: "Welcome to Grolite",
        template: "welcome",
        variables: {
            name,
        },
    };

    await sendMail(options);
}
async function subscribeToNewsLetter({ email, name }) {
    const options = {
        email,
        name,
        listName: "newsletter",
    };

    await addToMailingList(options);

    // logger.info(`New user subscribed to Newsletter: ${email}`);
}

async function unsubscribeFromNewsLetter(email) {
    const options = {
        email,
        listName: "newsletter",
    };

    await removeFromMailingList(options);

    // logger.info(`User unsubscribed from Newsletter: ${email}`);
}

module.exports = {
    signupEmail,
    resetPasswordEmail,
    welcomeNotification,
    subscribeToNewsLetter,
    unsubscribeFromNewsLetter
}  