const express = require('express');
const router = express.Router();
const { protect } = require('../../middleware/auth');
const {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    getTimeBlocks,
    createTimeBlock,
} = require('./calendar.controller');

// router.use(protect);

router.route('/').get(getEvents).post(createEvent);

router.get('/time-blocks', getTimeBlocks);
router.post('/time-blocks', createTimeBlock);

router.route('/:id').get(getEventById).put(updateEvent).delete(deleteEvent);

module.exports = router;
