const { analyzeIntent } = require("./privateEngineService");

async function decide(action) {
  const analysis = await analyzeIntent(action);

  if (analysis.risk_level === "LOW") {
    return {
      decision: "ALLOW",
      reason: analysis.reason
    };
  }

  if (analysis.risk_level === "MEDIUM") {
    return {
      decision: "STEP_UP",
      reason: analysis.reason
    };
  }

  return {
    decision: "BLOCK",
    reason: analysis.reason
  };
}

module.exports = { decide };