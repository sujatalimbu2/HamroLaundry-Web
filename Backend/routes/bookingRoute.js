const express = require("express");
const router = express.Router();

const {
  addBooking,
  getBookings,
  updateBooking,
  getCustomers,
  getServices,
  getMyBookings,
  cancelBooking,
} = require("../controller/bookingController");

router.post("/booking/create", addBooking);

// Get all bookings
router.get("/booking", getBookings);

// Update booking
router.put("/booking/:id", updateBooking);

router.get("/customers", getCustomers);
router.get("/services", getServices);
router.get("/my-bookings/:userId", getMyBookings);
router.put("/booking/cancel/:id", cancelBooking);

module.exports = router;
