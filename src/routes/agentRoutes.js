const express = require("express");
const { handleAction } = require("../controllers/agentController");

const router = express.Router();

router.post("/action", handleAction);

module.exports = router;