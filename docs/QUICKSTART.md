# Quick Start Guide

Get your Bible Telegram Bot running in 5 minutes! ⚡

## Step 1: Get a Bot Token (2 minutes)

1. Open Telegram and search for **@BotFather**
2. Start a chat and send: `/newbot`
3. Choose a name: `My Bible Bot` (or any name you like)
4. Choose a username: `mybible_bot` (must end with 'bot')
5. Copy the token that BotFather gives you (looks like: `123456789:ABCdef...`)

## Step 2: Install and Configure (2 minutes)

```bash
# Clone the repository
git clone https://github.com/yeab-B/Bible.git
cd Bible

# Install dependencies
npm install

# Configure your bot token
# Option A: Use environment variable (recommended)
export BOT_TOKEN='paste_your_token_here'

# Option B: Edit config.js
# Open config.js and replace YOUR_BOT_TOKEN_HERE with your token
```

## Step 3: Run the Bot (1 minute)

```bash
# Start the bot
npm start
```

You should see:
```
✅ Bible Bot is running...
📅 Daily verses scheduled at: 0 8 * * *
📖 Loaded Bible data with 7 books
🤖 Bot is ready to receive commands!
```

## Step 4: Test Your Bot

1. Open Telegram
2. Search for your bot username (e.g., `@mybible_bot`)
3. Start a conversation
4. Send: `/start`

You should receive a welcome message with today's daily verse! 🎉

## Common Commands to Try

```
/start       - Welcome message
/dailyverse  - Get a random verse
/books       - Browse Bible books
/read John 3:16 - Read a specific verse
/help        - Show help
```

## Next Steps

- **Customize**: Edit `config.js` to change daily verse time
- **Expand**: Add more verses to `bible.json`
- **Deploy**: Use PM2 or Docker for production (see USAGE.md)
- **Share**: Share your bot with friends and family!

## Troubleshooting

**Bot not responding?**
- Check if the bot is running (`npm start`)
- Verify your token in config.js
- Try restarting: `Ctrl+C` then `npm start`

**Error on startup?**
- Make sure you ran `npm install`
- Check that your token is correctly pasted (no extra spaces)
- Try: `node -c bot.js` to check for syntax errors

**Need more help?**
- See USAGE.md for detailed instructions
- Check README.md for full documentation
- Open an issue on GitHub

---

**That's it! Your Bible Bot is now running!** 🙏📖

Enjoy sharing the Word of God with your community!
