const express = require("express");

const app = express();
app.use(express.json());

const teamRouter = require("./routes/teamRoutes");
const playerRouter = require("./routes/playerRoutes");
const matchRouter = require("./routes/matchRoutes");

app.use("/api/v1/teams", teamRouter);
app.use("/api/v1/players", playerRouter);
app.use("/api/v1/all-matches", matchRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from the HBCL server!",
  });
});

module.exports = app;
