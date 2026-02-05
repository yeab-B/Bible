# Usage Guide for Bible Telegram Bot

## Getting Your Bot Token

1. Open Telegram and search for `@BotFather`
2. Start a chat with BotFather
3. Send `/newbot` command
4. Follow the instructions:
   - Choose a name for your bot (e.g., "My Bible Bot")
   - Choose a username for your bot (must end in 'bot', e.g., "mybible_bot")
5. BotFather will give you a token like: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`
6. Copy this token

## Configuration

### Option 1: Environment Variable (Recommended for production)

```bash
export BOT_TOKEN='your_token_here'
npm start
```

Or create a `.env` file:
```bash
cp .env.example .env
# Edit .env and add your token
```

### Option 2: Edit config.js (Good for development)

Open `config.js` and replace `YOUR_BOT_TOKEN_HERE` with your actual token:

```javascript
botToken: '1234567890:ABCdefGHIjklMNOpqrsTUVwxyz',
```

## Running the Bot

```bash
npm start
```

You should see:
```
✅ Bible Bot is running...
📅 Daily verses scheduled at: 0 8 * * *
📖 Loaded Bible data with 7 books
🤖 Bot is ready to receive commands!
```

## Testing the Bot

1. Open Telegram on your phone or desktop
2. Search for your bot by username (e.g., @mybible_bot)
3. Start a conversation
4. Try these commands:

### Command Examples

**Start the bot:**
```
/start
```
Response: Welcome message with today's daily verse

**Get a daily verse:**
```
/dailyverse
```
Response: Random verse from the Bible

**Browse books:**
```
/books
```
Response: Interactive buttons showing all available books

**Read specific verses:**
```
/read John 3:16
/read Psalms 23:1
/read Genesis 1:1
```

**Get help:**
```
/help
```

## Customizing Daily Verse Time

Edit `config.js` to change when daily verses are sent:

```javascript
// Format: minute hour day month weekday
dailyVerseTime: '0 8 * * *',  // 8:00 AM every day
```

Examples:
- `'0 6 * * *'` - 6:00 AM every day
- `'0 12 * * *'` - 12:00 PM (noon) every day
- `'0 20 * * *'` - 8:00 PM every day
- `'0 9 * * 1'` - 9:00 AM every Monday

## Extending the Bible Data

The current `bible.json` includes a sample of Bible books. To add more:

1. Open `bible.json`
2. Add books, chapters, and verses following this structure:

```json
{
  "books": [
    {
      "name": "BookName",
      "chapters": [
        {
          "chapter": 1,
          "verses": [
            { "verse": 1, "text": "Verse text here" },
            { "verse": 2, "text": "Another verse text" }
          ]
        }
      ]
    }
  ]
}
```

3. Restart the bot to load the new data

## Features in Detail

### 1. Daily Verses
- Automatically sends a random verse to all subscribers at scheduled time
- Users are automatically subscribed when they use `/start` or `/dailyverse`
- Verses are randomly selected from all available books

### 2. Interactive Book Navigation
- `/books` shows all books as buttons
- Clicking a book shows all its chapters as buttons
- Clicking a chapter displays all verses in that chapter
- Back buttons allow easy navigation

### 3. Quick Verse Reading
- Use `/read Book Chapter:Verse` format
- Example: `/read John 3:16`
- Case-insensitive book names
- Instant verse retrieval

### 4. Error Handling
- Invalid book names suggest using `/books`
- Invalid chapters show available chapters
- Invalid verses show available verses
- Helpful error messages guide users

## Troubleshooting

### Bot not responding?
- Check if the bot is running (`npm start`)
- Verify your bot token is correct
- Make sure there are no firewall issues
- Check console for error messages

### Daily verses not sending?
- Verify the cron schedule in `config.js`
- Check system time is correct
- Bot must be running at scheduled time
- Check console logs for errors

### "Polling error"?
- Another instance of the bot might be running
- Token might be invalid
- Kill all node processes and restart:
  ```bash
  killall node
  npm start
  ```

### Can't find certain books?
- Check if the book exists in `bible.json`
- Book names are case-insensitive
- Use `/books` to see all available books

## Production Deployment

### Using PM2 (Process Manager)

```bash
npm install -g pm2
pm2 start bot.js --name bible-bot
pm2 startup  # Enable auto-start on system boot
pm2 save
```

Monitor the bot:
```bash
pm2 status
pm2 logs bible-bot
```

### Using Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t bible-bot .
docker run -d --name bible-bot -e BOT_TOKEN='your_token' bible-bot
```

## Security Notes

- **Never commit your bot token** to git
- Use environment variables for sensitive data
- Keep `.env` in `.gitignore`
- Regularly update dependencies: `npm update`
- Monitor bot logs for suspicious activity

## Performance Tips

- The bot handles multiple users simultaneously
- No database required for basic operation
- Add more verses to `bible.json` as needed
- Consider using a database for user preferences (future enhancement)

## Support

If you encounter issues:
1. Check the troubleshooting section
2. Review console logs for errors
3. Verify all configuration settings
4. Test with `/start` command first
5. Open an issue on GitHub if needed

---

**Made with ❤️ for spreading the Word of God**
