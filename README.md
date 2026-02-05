# Bible Telegram Bot 📖

A feature-rich Telegram bot that delivers daily Bible verses and allows users to browse and read the Bible interactively.

## Features ✨

- 🌅 **Daily Verse**: Automatically sends a random Bible verse to subscribers at a scheduled time
- 📚 **Browse Books**: Interactive navigation through all books of the Bible
- 📖 **Read Verses**: Quick access to specific verses using commands
- ⌨️ **Inline Keyboards**: Easy navigation with buttons for books, chapters, and verses
- 🔍 **Smart Search**: Read specific verses with `/read BookName Chapter:Verse` format
- ⚠️ **Error Handling**: Graceful handling of invalid book, chapter, or verse requests

## Commands 🤖

- `/start` - Welcome message with today's daily verse
- `/help` - Display help information and available commands
- `/dailyverse` - Get a random daily verse
- `/books` - Browse all books of the Bible with interactive buttons
- `/read <Book> <Chapter>:<Verse>` - Read a specific verse
  - Example: `/read John 3:16`
  - Example: `/read Psalms 23:1`

## Installation 🚀

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- A Telegram Bot Token (get one from [@BotFather](https://t.me/botfather))

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

3. **Configure the bot**
   
   Open `config.js` and add your bot token:
   ```javascript
   botToken: 'YOUR_BOT_TOKEN_HERE'
   ```
   
   Or set it as an environment variable:
   ```bash
   export BOT_TOKEN='YOUR_BOT_TOKEN_HERE'
   ```

4. **Run the bot**
   ```bash
   npm start
   ```

## Configuration ⚙️

Edit `config.js` to customize:

- **Bot Token**: Your Telegram bot token from BotFather
- **Daily Verse Time**: Cron schedule for daily verses (default: 8:00 AM)
- **Display Settings**: Verses per page, chapters per row, etc.

```javascript
module.exports = {
  botToken: process.env.BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE',
  dailyVerseTime: '0 8 * * *',  // 8:00 AM every day
  settings: {
    versesPerPage: 10,
    chaptersPerRow: 5,
    booksPerPage: 10
  }
};
```

## Bible Data 📚

The bot uses `bible.json` to store Bible verses. The JSON structure:

```json
{
  "books": [
    {
      "name": "Genesis",
      "chapters": [
        {
          "chapter": 1,
          "verses": [
            { "verse": 1, "text": "In the beginning..." }
          ]
        }
      ]
    }
  ]
}
```

You can extend `bible.json` with more books, chapters, and verses as needed.

## Usage Examples 📱

### Getting Started
```
User: /start
Bot: 🌟 Welcome to the Bible Bot!
     Here's your daily verse:
     📖 John 3:16
     For God so loved the world...
```

### Browsing Books
```
User: /books
Bot: [Shows buttons: Genesis | Exodus | Psalms | ...]
User: [Clicks "Genesis"]
Bot: [Shows buttons: Ch 1 | Ch 2 | ...]
User: [Clicks "Ch 1"]
Bot: Displays all verses from Genesis Chapter 1
```

### Quick Read
```
User: /read John 3:16
Bot: 📖 John 3:16
     For God so loved the world, that he gave his only begotten Son...
```

## Project Structure 📁

```
Bible/
├── bot.js           # Main bot application
├── config.js        # Configuration file
├── bible.json       # Bible data (books, chapters, verses)
├── package.json     # Node.js dependencies
├── .gitignore       # Git ignore rules
└── README.md        # This file
```

## Error Handling 🛡️

The bot includes comprehensive error handling:

- **Invalid Book**: Notifies user and suggests using `/books`
- **Invalid Chapter**: Shows available chapters for the selected book
- **Invalid Verse**: Shows available verses for the selected chapter
- **Wrong Format**: Provides usage examples for `/read` command
- **Bot Errors**: Logs errors and continues running

## Dependencies 📦

- **node-telegram-bot-api** (^0.66.0) - Telegram Bot API wrapper
- **node-cron** (^3.0.3) - Task scheduler for daily verses

## Development 💻

### Adding More Bible Content

To add more books, chapters, or verses, edit `bible.json`:

```json
{
  "books": [
    {
      "name": "YourBook",
      "chapters": [
        {
          "chapter": 1,
          "verses": [
            { "verse": 1, "text": "Your verse text..." }
          ]
        }
      ]
    }
  ]
}
```

### Testing

Start the bot and test commands:
```bash
npm start
```

Open Telegram and find your bot, then test:
- `/start`
- `/dailyverse`
- `/books`
- `/read John 3:16`

## Contributing 🤝

Contributions are welcome! Feel free to:
- Add more Bible verses to `bible.json`
- Improve error handling
- Add new features
- Fix bugs

## License 📄

ISC License

## Support 💬

For issues or questions, please open an issue on GitHub.

---

Made with ❤️ for spreading the Word of God