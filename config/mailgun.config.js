const Mailgun = require('mailgun.js');
const formData = require('form-data');
const mailgun = new Mailgun(formData);
require('dotenv').config();

// const domain = 'mail.tutorai-app.com';

const client = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY,
    url: 'https://api.eu.mailgun.net'
});

// const messageData = {
//     from: 'Excited User <mailgun@tutorai-app.com>',
//     to: 'adejuwonevidence181@gmail.com',
//     subject: 'Hello',
//     text: 'Testing some Mailgun awesomeness!'
// };

// client.messages.create(domain, messageData)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.error(err);
//     });

module.exports = client;
