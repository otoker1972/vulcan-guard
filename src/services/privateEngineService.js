async function analyzeIntent(action) {
  const normalized = String(action || "").toLowerCase().trim();

  const hasNegation =
    normalized.includes("do not") ||
    normalized.includes("don't") ||
    normalized.includes("dont") ||
    normalized.includes("never") ||
    normalized.includes("not ");

  const mentionsRead =
    normalized.includes("read") ||
    normalized.includes("analyze") ||
    normalized.includes("scan") ||
    normalized.includes("export");

  const mentionsBroadScope =
    normalized.includes("all emails") ||
    normalized.includes("all data") ||
    normalized.includes("everything") ||
    normalized.includes("export all") ||
    normalized.includes("scan everything");

  const mentionsMediumScope =
    normalized.includes("30 days") ||
    normalized.includes("history") ||
    normalized.includes("multiple emails") ||
    normalized.includes("all recent");

  if (hasNegation && mentionsRead) {
    return {
      risk_level: "MEDIUM",
      reason: "Negated or ambiguous instruction detected; requires stronger confirmation"
    };
  }

  if (mentionsBroadScope) {
    return {
      risk_level: "HIGH",
      reason: "Requested scope is too broad for the stated action"
    };
  }

  if (mentionsMediumScope) {
    return {
      risk_level: "MEDIUM",
      reason: "This action needs stronger user confirmation"
    };
  }

  return {
    risk_level: "LOW",
    reason: "Action is narrow and consistent with least-privilege access"
  };
}

module.exports = { analyzeIntent };