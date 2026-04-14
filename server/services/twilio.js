import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

let client;
if (accountSid && authToken && accountSid !== 'your_twilio_account_sid_here') {
  client = twilio(accountSid, authToken);
}

const { VoiceResponse } = twilio.twiml;

export { client as twilioClient, VoiceResponse };

export function handleIncomingCall(req, res) {
  const twiml = new VoiceResponse();

  twiml.say("Welcome to Voice Survey AI.");

  twiml.gather({
    input: "speech",
    action: "/voice/process",
    method: "POST",
    speechTimeout: "auto"
  }).say("How satisfied are you with our service?");

  res.type("text/xml");
  res.send(twiml.toString());
}