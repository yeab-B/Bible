/**
 * Telegram Bible Bot
 * Main entry point for the bot application
 * 
 * This bot provides daily Bible verses and allows users to browse
 * and read the Bible through an interactive Telegram interface.
 */

require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const BibleDataHandler = require('./bibleDataHandler');
const {
  handleStartCommand,
  handleHelpCommand,
  handleDailyVerseCommand,
  handleBooksCommand,
  handleReadCommand,
  handleCallbackQuery
} = require('./commandHandlers');

// Check if BOT_TOKEN is set
if (!process.env.BOT_TOKEN) {
  console.error('❌ Error: BOT_TOKEN is not set in environment variables!');
  console.error('Please create a .env file with your Telegram bot token:');
  console.error('BOT_TOKEN=your_bot_token_here');
  process.exit(1);
}

// Initialize the bot
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

// Initialize Bible data handler
let bibleHandler;
try {
  bibleHandler = new BibleDataHandler();
  console.log('✅ Bible data loaded successfully!');
} catch (error) {
  console.error('❌ Failed to initialize Bible data handler:', error);
  process.exit(1);
}

// Register command handlers
handleStartCommand(bot, bibleHandler);
handleHelpCommand(bot);
handleDailyVerseCommand(bot, bibleHandler);
handleBooksCommand(bot, bibleHandler);
handleReadCommand(bot, bibleHandler);

// Register callback query handler
handleCallbackQuery(bot, bibleHandler);

// Error handling
bot.on('polling_error', (error) => {
  console.error('Polling error:', error.code);
  console.error('Message:', error.message);
});

bot.on('error', (error) => {
  console.error('Bot error:', error);
});

console.log('🤖 Bible Bot is running...');
console.log('📖 Ready to share God\'s Word!');
