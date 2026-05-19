const express = require('express');
const { createBooking, getUserBookings, getAllBookings, updateBookingStatus, addReview } = require('../controllers/bookingController');
const { authenticate, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticate, createBooking);
router.get('/my', authenticate, getUserBookings);
router.get('/all', authenticate, isAdmin, getAllBookings);
router.put('/:id/status', authenticate, isAdmin, updateBookingStatus);
router.post('/review', authenticate, addReview);

module.exports = router;