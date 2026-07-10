const pool = require("../database/db");

const createFeedback = async (user_id, rating, services, review) => {
  const result = await pool.query(
    `INSERT INTO feedback
        (user_id, rating, services, review)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
    [user_id, rating, services, review],
  );

  return result.rows[0];
};

module.exports = {
  createFeedback,
};
