# Bible Bot Usage Guide

## Quick Start

1. **Get a Telegram Bot Token**
   - Open Telegram and search for @BotFather
   - Send `/newbot` command
   - Follow the prompts to create your bot
   - Copy the bot token provided

2. **Configure the Bot**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env and add your bot token
   nano .env  # or use any text editor
   ```

3. **Start the Bot**
   ```bash
   npm start
   ```

4. **Find Your Bot**
   - Open Telegram
   - Search for your bot by username
   - Send `/start` to begin

## Available Commands

### `/start`
Shows a welcome message with a random daily Bible verse.

**Example:**
```
🙏 Welcome to the Bible Bot! 🙏

Here's your daily verse:

📖 John 3:16

For God so loved the world, that he gave his only begotten Son...
```

### `/dailyverse`
Get a new random Bible verse at any time.

### `/books`
Browse all available books in the Bible. Returns an interactive keyboard with book names.

**Flow:**
1. Click on a book name (e.g., "Genesis")
2. See all available chapters
3. Select a chapter number
4. Choose to read:
   - A specific verse (click verse number)
   - All verses (click "📖 Read All Verses")

### `/read`
Same as `/books` - starts the reading experience.

### `/help`
Shows all available commands and instructions.

## Navigation Features

### Inline Keyboards
The bot uses interactive buttons for easy navigation:
- **Book Selection**: Up to 6 books per page (2 per row)
- **Chapter Selection**: Up to 12 chapters per page (4 per row)
- **Verse Selection**: Up to 12 verses per page (4 per row)

### Pagination
When there are many items, use the navigation buttons:
- `⬅️ Previous` - Go to previous page
- `➡️ Next` - Go to next page

### Back Navigation
Every screen has a back button:
- `🔙 Back to Books` - Return from chapter selection
- `🔙 Back to Chapters` - Return from verse selection

## Examples

### Reading a Specific Verse
1. Send `/read`
2. Click "John"
3. Click "3" (chapter)
4. Click "16" (verse)
5. Receive: "📖 John 3:16\n\nFor God so loved the world..."

### Reading a Full Chapter
1. Send `/books`
2. Click "Psalms"
3. Click "23" (chapter)
4. Click "📖 Read All Verses"
5. Receive all 4 verses of Psalm 23

### Getting Daily Inspiration
1. Send `/dailyverse`
2. Receive a random verse from anywhere in the Bible
3. Send again for a different verse

## Error Handling

The bot gracefully handles errors:
- **Invalid Book**: "❌ Book not found!"
- **Invalid Chapter**: "❌ Chapter not found!"
- **Invalid Verse**: "❌ Verse not found!"

## Tips

- Use `/dailyverse` multiple times for different random verses
- The bot remembers your navigation - use back buttons to explore
- Long chapters are automatically split into multiple messages
- All responses include book, chapter, and verse references

## Troubleshooting

### Bot Not Responding
- Check that `npm start` is running
- Verify BOT_TOKEN in .env is correct
- Check for error messages in the console

### Wrong Verse Showing
- Verify bible.json has the correct data
- Check that book/chapter/verse numbers match your expectations

### Connection Issues
- Ensure you have internet connection
- Check if Telegram is accessible
- Verify firewall/proxy settings

## Extending the Bible Data

To add more books, chapters, or verses:

1. Open `bible.json`
2. Follow the existing structure:
```json
{
  "books": [
    {
      "id": 7,
      "name": "BookName",
      "chapters": [
        {
          "chapter": 1,
          "verses": [
            {
              "verse": 1,
              "text": "Verse text here."
            }
          ]
        }
      ]
    }
  ]
}
```
3. Restart the bot

## Support

For issues or questions:
- Check the main README.md
- Open an issue on GitHub
- Review the test.js file for functionality examples

May God bless you as you use this bot! 🙏
