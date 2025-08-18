require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const { initSocket } = require("./socket");
const { sql } = require("./config/sql");
const { connectMongo } = require("./config/mongo");
console.log("ENV check:", process.env.SQL_SERVER, process.env.SQL_DB, process.env.SQL_USER);

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/api", (req, res) => res.json({ status: "ok" }));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
app.use("/api/teams", require("./routes/teams"));
app.use("/api/submissions", require("./routes/submissions"));
app.use("/api/judging", require("./routes/judging"));
app.use("/api/announcements", require("./routes/announcements"));
app.use("/api/leaderboard", require("./routes/leaderboard"));
app.use("/api/analytics", require("./routes/analytics"));

const server = http.createServer(app);
initSocket(server);

(async () => {
  try {
    await sql.authenticate();
    await require("./models/sql").sync();
    await connectMongo();
    server.listen(process.env.PORT, () =>
      console.log(`API running on port ${process.env.PORT}`)
    );
  } catch (err) {
    console.error("Startup error:", err);
  }
})();
