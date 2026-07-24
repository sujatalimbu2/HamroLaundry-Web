const express = require("express");
const router = express.Router();
const { downloadReceipt } = require("../controller/receiptController");

const {
  addBooking,
  getBookings,
  updateBooking,
  getCustomers,
  getServices,
  getMyBookings,
  cancelBooking,
  updateService,
  getBookedSlots,
} = require("../controller/bookingController");

router.post("/booking/create", addBooking);

// Get all bookings
router.get("/booking", getBookings);

// Update booking
router.put("/booking/:id", updateBooking);

router.get("/customers", getCustomers);
router.get("/services", getServices);
router.put("/services/:id", updateService);
router.get("/my-bookings/:userId", getMyBookings);
router.put("/booking/cancel/:id", cancelBooking);
router.get("/receipt/:id", downloadReceipt);
router.get("/booked-slots", getBookedSlots);

module.exports = router;
