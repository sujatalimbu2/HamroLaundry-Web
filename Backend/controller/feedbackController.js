const { createFeedback } = require("../model/feedbackModel");

const submitFeedback = async (req, res) => {
  try {
    // Logged-in user's ID from JWT
    const user_id = req.user.id;

    // Data sent from React
    const { rating, services, review } = req.body;

    // Validation
    if (!rating || !review) {
      return res.status(400).json({
        message: "Rating and review are required.",
      });
    }

    // Convert services array to text
    const serviceText = Array.isArray(services)
      ? services.join(", ")
      : services;

    // Save to database
    const feedback = await createFeedback(user_id, rating, serviceText, review);

    return res.status(201).json({
      message: "Feedback submitted successfully.",
      feedback,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Failed to submit feedback.",
      error: e.message,
    });
  }
};

module.exports = {
  submitFeedback,
};
