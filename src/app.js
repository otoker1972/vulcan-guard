const express = require("express");
const path = require("path");

const imported = require("./routes/agentRoutes");
const agentRoutes = imported.default || imported;
const protectedRoutes = require("./routes/protectedRoutes");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "vulcan-guard/public")));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/protected", protectedRoutes);
app.use("/agent", agentRoutes);

module.exports = app;