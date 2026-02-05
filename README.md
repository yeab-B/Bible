# Bible Telegram Bot 📖

A feature-rich Telegram bot that provides daily Bible verses and allows users to browse and read the Bible interactively.

## Features ✨

- 📖 **Daily Verse**: Get a random inspirational Bible verse
- 📚 **Browse Books**: Navigate through all books of the Bible
- 🔍 **Chapter Selection**: Choose any chapter from your selected book
- 📝 **Verse Reading**: Read individual verses or entire chapters
- ⌨️ **Inline Keyboards**: Easy navigation with interactive buttons
- 🎯 **Dynamic Loading**: Verses loaded from JSON file
- ✅ **Error Handling**: Graceful handling of invalid chapters/verses
- 🧩 **Modular Code**: Clean, well-commented, and maintainable structure

## Commands 🤖

- `/start` - Welcome message with a daily verse
- `/dailyverse` - Get a random daily Bible verse
- `/books` - Browse all books of the Bible
- `/read` - Start reading the Bible (same as /books)
- `/help` - Show help message with available commands

## Installation 🚀

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn
- A Telegram Bot Token (get one from [@BotFather](https://t.me/BotFather))

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yeab-B/Bible.git
   cd Bible
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Telegram Bot Token:
   ```
   BOT_TOKEN=your_telegram_bot_token_here
   ```

4. **Start the bot**
   ```bash
   npm start
   ```

## Project Structure 📁

```
Bible/
├── bot.js                  # Main bot entry point
├── bibleDataHandler.js     # Bible data management module
├── commandHandlers.js      # Command and callback handlers
├── keyboardHelper.js       # Inline keyboard generation
├── bible.json              # Bible books, chapters, and verses data
├── package.json            # Project dependencies and scripts
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## How to Use 📱

1. **Start the bot**: Send `/start` to receive a welcome message and daily verse

2. **Get daily verse**: Use `/dailyverse` anytime for a random inspirational verse

3. **Browse books**: Use `/books` or `/read` to see all available books

4. **Select a book**: Click on any book button to see its chapters

5. **Choose a chapter**: Click on a chapter number to see available verses

6. **Read verses**: 
   - Click on a verse number to read that specific verse
   - Click "📖 Read All Verses" to read the entire chapter

7. **Navigate**: Use the arrow buttons (⬅️ ➡️) to navigate between pages

8. **Go back**: Use the 🔙 Back buttons to return to the previous menu

## Customization 🎨

### Adding More Bible Content

Edit `bible.json` to add more books, chapters, and verses. Follow this structure:

```json
{
  "books": [
    {
      "id": 1,
      "name": "Genesis",
      "chapters": [
        {
          "chapter": 1,
          "verses": [
            {
              "verse": 1,
              "text": "In the beginning God created the heaven and the earth."
            }
          ]
        }
      ]
    }
  ]
}
```

### Modifying Bot Behavior

- **Daily Verse Logic**: Edit `getRandomVerse()` in `bibleDataHandler.js`
- **Command Responses**: Modify handlers in `commandHandlers.js`
- **Keyboard Layout**: Adjust keyboard functions in `keyboardHelper.js`
- **Pagination**: Change `itemsPerPage` parameters in keyboard functions

## Error Handling ⚠️

The bot includes comprehensive error handling:

- **Invalid books**: Displays error message if book not found
- **Invalid chapters**: Alerts user when chapter doesn't exist
- **Invalid verses**: Shows error for non-existent verses
- **Long messages**: Automatically splits messages over 4096 characters
- **Connection errors**: Logs polling and bot errors

## Development 💻

### Code Style

- Well-commented code with JSDoc-style documentation
- Modular architecture with separated concerns
- Clean and readable variable/function naming
- Consistent formatting throughout

### Testing

To test the bot locally:

1. Set up your bot token in `.env`
2. Run `npm start`
3. Open Telegram and find your bot
4. Try all commands and navigation features

## Dependencies 📦

- `node-telegram-bot-api` - Telegram Bot API wrapper
- `dotenv` - Environment variable management

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📄

ISC

## Support 💬

If you encounter any issues or have questions, please open an issue on GitHub.

---

**May God bless you!** 🙏