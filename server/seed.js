require("dotenv").config();
const { sql } = require("./config/sql");
const { Event } = require("./models/sql");

(async () => {
  try {
    await sql.authenticate();
    console.log("Connected to SQL...");

    await Event.create({
      name: "HackTatva Opening Ceremony",   // ✅ use 'name' not 'title'
      description: "Kickoff event for HackTatva!",
      startAt: new Date("2025-08-25T10:00:00Z"),  // ✅ required if your table has NOT NULL
      endAt: new Date("2025-08-25T12:00:00Z"),
      tracks: "Hackathon, Coding, Innovation",   // ✅ optional if NOT NULL
      createdBy: 1
    });

    console.log("✅ Sample event inserted!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error inserting event:", err);
    process.exit(1);
  }
})();
