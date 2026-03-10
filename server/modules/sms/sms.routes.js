const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth');
const { adminOnly } = require('../../middleware/adminOnly');
const { sendCustomSMS } = require('./sms.controller');
const { triggerReminders } = require('./reminders.service');

router.post('/admin/sms/send', protect, adminOnly, sendCustomSMS);
router.post('/admin/sms/trigger-reminders', protect, adminOnly, triggerReminders);

module.exports = router;
