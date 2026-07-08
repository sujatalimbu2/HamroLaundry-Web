const express = require("express");
const router = express.Router();

const {
    addBooking,
    getBookings,
    updateBooking,
    getCustomers
} = require("../controller/bookingController");

router.post("/booking/create", addBooking);

// Get all bookings
router.get("/booking", getBookings);

// Update booking
router.put("/booking/:id", updateBooking);

router.get("/customers", getCustomers);

module.exports = router;