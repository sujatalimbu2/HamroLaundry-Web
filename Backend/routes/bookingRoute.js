const express = require("express");

const router = express.Router();

const {
    addBooking,
} = require("../controller/bookingController");

router.post("/booking/create", addBooking);

module.exports = router;