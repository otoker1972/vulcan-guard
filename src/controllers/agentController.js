const { decide } = require("../services/decisionService");
const { getToken } = require("../services/auth0Service");
const axios = require("axios");

async function handleAction(req, res) {
  try {
    const { action } = req.body;

    if (!action || typeof action !== "string") {
      return res.status(400).json({
        status: "error",
        reason: "action is required and must be a string"
      });
    }

    const result = await decide(action);

    if (result.decision === "BLOCK") {
      return res.json({
        status: "blocked",
        decision: result.decision,
        reason: result.reason,
        token_acquired: false
      });
    }

    if (result.decision === "STEP_UP") {
      return res.json({
        status: "step-up-required",
        decision: result.decision,
        reason: result.reason,
        token_acquired: false
      });
    }

    const tokenData = await getToken();

    const protectedResponse = await axios.get(
      "http://localhost:3000/protected/email-summary",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`
        }
      }
    );

    return res.json({
      status: "allowed",
      decision: result.decision,
      reason: result.reason,
      token_acquired: true,
      token_type: tokenData.token_type,
      expires_in: tokenData.expires_in,
      access_token_preview: tokenData.access_token
        ? `${tokenData.access_token.slice(0, 20)}...`
        : null,
      protected_data: protectedResponse.data
    });
  } catch (error) {
    console.error("handleAction error:", error.message);

    return res.status(500).json({
      status: "error",
      reason: error.message || "internal server error"
    });
  }
}

module.exports = { handleAction };