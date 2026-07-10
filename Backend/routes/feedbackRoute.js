const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/verifyToken");
const { submitFeedback } = require("../controller/feedbackController");

// Submit feedback (only logged-in users)
router.post("/", verifyToken, submitFeedback);

module.exports = router;
