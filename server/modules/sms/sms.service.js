const twilio = require('twilio');

/**
 * SMS Service
 * Handles sending messages via Twilio API.
 * Falls back to console logging if credentials are not provided.
 */

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

let client = null;

if (accountSid && authToken) {
    try {
        client = twilio(accountSid, authToken);
        console.log('✅ Twilio SMS client initialized');
    } catch (err) {
        console.error('❌ Failed to initialize Twilio client:', err.message);
    }
} else {
    console.warn('⚠️ Twilio credentials missing. SMS will be logged to console only.');
}

/**
 * Send an SMS message
 * @param {string} to - Recipient phone number
 * @param {string} body - Message body
 */
const sendSMS = async (to, body) => {
    if (!to) {
        console.warn('⚠️ Cannot send SMS: No recipient phone number provided');
        return false;
    }

    const messagePayload = {
        to,
        from: fromNumber || '+1234567890', // Default mock number
        body,
    };

    if (client) {
        try {
            const message = await client.messages.create(messagePayload);
            console.log(`✅ SMS sent to ${to}: ${message.sid}`);
            return true;
        } catch (err) {
            console.error(`❌ Twilio Error sending to ${to}:`, err.message);
            // Fallback to log in dev/failure
            console.log(`[SMS FALLBACK LOG] To: ${to} | Body: ${body}`);
            return false;
        }
    } else {
        console.log(`[SMS MOCK LOG] To: ${to} | Body: ${body}`);
        return true;
    }
};

/**
 * Predefined Templates
 */
const TEMPLATES = {
    RENEWAL_REMINDER: (name, price) => `Hi ${name}, your Dashify subscription renews tomorrow for $${price}. Reply STOP to opt out.`,
    BOOKING_CONFIRMED: (name, date) => `Hi ${name}, your shoot for ${date} has been confirmed! We'll see you then.`,
    SHOOT_REMINDER: (name, date) => `Hey ${name}, just a reminder about our shoot tomorrow at ${date}. Can't wait!`,
    PAYMENT_LINK: (name, link) => `Hi ${name}, here is your payment link to activate your Dashify plan: ${link}`,
    CALENDAR_LINK: (name, link) => `Hi ${name}, thanks for the payment! Book your strategy call here: ${link}`,
};

module.exports = {
    sendSMS,
    TEMPLATES,
};
