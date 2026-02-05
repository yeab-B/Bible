// Configuration file for the Telegram Bible Bot
module.exports = {
  // Telegram Bot Token - Replace with your actual token from @BotFather
  // To get a token: 
  // 1. Open Telegram and search for @BotFather
  // 2. Send /newbot and follow instructions
  // 3. Copy the token and paste it here
  botToken: process.env.BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE',
  
  // Daily verse schedule - Format: minute hour * * *
  // Default: 8:00 AM every day
  dailyVerseTime: '0 8 * * *',
  
  // Bot settings
  settings: {
    versesPerPage: 10,
    chaptersPerRow: 5,
    booksPerPage: 10
  }
};
