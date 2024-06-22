const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const sendSMS = (to, body) => {
  client.messages.create({
    body: body,
    to: to,
    from: 'YOUR_TWILIO_PHONE_NUMBER'
  })
  .then(message => console.log(message.sid))
  .catch(error => console.error(error));
};

module.exports = { sendSMS };
