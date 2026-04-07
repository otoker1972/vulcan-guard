const express = require("express");
const router = express.Router();

router.get("/email-summary", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Unauthorized",
      reason: "Missing or invalid token"
    });
  }

  // token var → geçiş veriyoruz
  return res.json({
    data: "Here is your email summary 📧",
    source: "Protected API"
  });
});

module.exports = router;