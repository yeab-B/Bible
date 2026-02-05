// Configuration file for the Telegram Bible Bot
// Configuration file for the Telegram Bible Bot
// This file exports a sanitized token and basic settings.
require("dotenv").config();

const rawToken = process.env.BOT_TOKEN || "YOUR_BOT_TOKEN_HERE";
const botToken = typeof rawToken === "string" ? rawToken.trim() : rawToken;

// Basic validation to catch common issues early (placeholder token, empty, or only whitespace)
if (!botToken || botToken === "YOUR_BOT_TOKEN_HERE") {
  console.error("\nERROR: Telegram bot token is not configured.");
  console.error(
    "Set the BOT_TOKEN environment variable with the token you received from @BotFather.",
  );
  console.error("Example (Linux/macOS): export BOT_TOKEN='123456:ABC-DEF'\n");
  // Exit so the bot doesn't attempt to poll with an invalid token (which causes 404s)
  process.exit(1);
}

module.exports = {
  botToken,
  // Daily verse schedule - Format: minute hour * * *
  // Default: 8:00 AM every day
  dailyVerseTime: "0 8 * * *",

  // Bot settings
  settings: {
    versesPerPage: 10,
    chaptersPerRow: 5,
    booksPerPage: 10,
  },
};
