const JWT = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token found",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (e) {
    console.log("JWT Error:", e.message);

    return res.status(401).json({
      message: e.message,
    });
  }
};

module.exports = { verifyToken };
