require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { connectMongo } = require("./config/mongo");
const { sql } = require("./config/sql");
const passport = require("passport");

// Import routes
const authRoutes = require("./routes/auth");
const socialAuthRoutes = require("./routes/socialAuth");
const eventsRoutes = require("./routes/events");
const teamsRoutes = require("./routes/teams");
const submissionsRoutes = require("./routes/submissions");
const leaderboardRoutes = require("./routes/leaderboard");
const judgingRoutes = require("./routes/judging");
const announcementsRoutes = require("./routes/announcements");
const analyticsRoutes = require("./routes/analytics");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Passport middleware
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/auth", socialAuthRoutes); // Social OAuth routes
app.use("/api/events", eventsRoutes);
app.use("/api/teams", teamsRoutes);
app.use("/api/submissions", submissionsRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/judging", judgingRoutes);
app.use("/api/announcements", announcementsRoutes);
app.use("/api/analytics", analyticsRoutes);

// Socket.io connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    services: {
      database: "Connected",
      socket: "Running"
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ 
    error: "Internal server error",
    message: err.message 
  });
});

// 404 handler - Fixed to avoid path-to-regexp error
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Environment check
console.log("🔎 Environment check:");
console.log("SQL_SERVER:", process.env.SQL_SERVER);
console.log("SQL_DB:", process.env.SQL_DB);
console.log("SQL_USER:", process.env.SQL_USER);

// Initialize Azure Blob
require("./config/blob");

// Server startup
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
      console.log("📧 Email service:", process.env.EMAIL_USER ? "Configured" : "Not configured");
      console.log("🔐 OAuth providers:");
      console.log("   - Google:", process.env.GOOGLE_CLIENT_ID ? "Configured" : "Not configured");
    });

  } catch (err) {
    console.error("❌ Startup error:", err.message);
    console.error("Error details:", err);
    console.error("Stack trace:", err.stack);
    process.exit(1);
  }
})();
