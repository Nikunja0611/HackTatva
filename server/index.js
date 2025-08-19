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
    console.log("🔄 Starting server initialization...");
    
    // Test SQL connection
    console.log("🔍 Testing SQL connection...");
    await sql.authenticate();
    console.log("✅ SQL authentication successful");
    
    // Initialize models and associations
    console.log("📋 Loading SQL models...");
    const { User, Event, Score } = require("./models/sql");
    console.log("✅ SQL models loaded successfully");
    
    // Connect to MongoDB
    console.log("🔍 Connecting to MongoDB...");
    await connectMongo();
    console.log("✅ MongoDB connected");
    
    // Start server
    server.listen(process.env.PORT, () => {
      console.log(`🚀 API running on port ${process.env.PORT}`);
      console.log("🎉 Server startup complete!");
    });
    
  } catch (err) {
    console.error("❌ Startup error:", err.message);
    console.error("Error details:", err);
    console.error("Stack trace:", err.stack);
    process.exit(1);
  }
})();
