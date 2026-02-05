# Bible Bot Demo Flow

This document shows the expected user interaction flow with the Bible Bot.

## Scenario 1: First-Time User

**User Action:** Opens bot and sends `/start`

**Bot Response:**
```
🙏 Welcome to the Bible Bot! 🙏

Here's your daily verse:

📖 Psalms 23:1

The LORD is my shepherd; I shall not want.

📚 Available Commands:
/dailyverse - Get a random daily verse
/books - Browse books of the Bible
/read - Start reading the Bible
/help - Show this help message
```

---

## Scenario 2: Getting Daily Verse

**User Action:** Sends `/dailyverse`

**Bot Response:**
```
✨ Daily Verse ✨

📖 John 3:16

For God so loved the world, that he gave his only begotten Son, 
that whosoever believeth in him should not perish, but have 
everlasting life.

God bless you! 🙏
```

---

## Scenario 3: Reading the Bible

**User Action:** Sends `/books`

**Bot Response:** Shows inline keyboard with book buttons:
```
📚 Select a book from the Bible:

[Genesis] [Exodus]
[Psalms]  [Proverbs]
[John]    [Romans]
```

**User Action:** Clicks "Psalms"

**Bot Response:** Updates message with chapter selection:
```
📖 Psalms

Select a chapter (2 chapters available):

[1] [23]

🔙 Back to Books
```

**User Action:** Clicks "23"

**Bot Response:** Shows verse selection:
```
📖 Psalms 23

Select a verse (4 verses available):

[1] [2] [3] [4]

📖 Read All Verses

🔙 Back to Chapters
```

**User Action:** Clicks "📖 Read All Verses"

**Bot Response:** Sends full chapter:
```
📖 Psalms 23

1. The LORD is my shepherd; I shall not want.

2. He maketh me to lie down in green pastures: he leadeth me 
   beside the still waters.

3. He restoreth my soul: he leadeth me in the paths of 
   righteousness for his name's sake.

4. Yea, though I walk through the valley of the shadow of death, 
   I will fear no evil: for thou art with me; thy rod and thy 
   staff they comfort me.
```

---

## Scenario 4: Reading Specific Verse

**User Action:** Sends `/read`, clicks "John", clicks "3", clicks "16"

**Bot Response:**
```
📖 John 3:16

For God so loved the world, that he gave his only begotten Son, 
that whosoever believeth in him should not perish, but have 
everlasting life.
```

---

## Scenario 5: Error Handling

**User Action:** Navigates to an invalid chapter (simulation)

**Bot Response:** Alert popup:
```
❌ Chapter not found!
```

The bot returns to the previous valid state.

---

## Technical Notes

- All navigation uses Telegram's inline keyboards
- No manual typing required after initial command
- Instant feedback for all interactions
- Clean, emoji-enhanced messages
- Proper error handling throughout
- Back buttons for easy navigation
- Pagination for large lists

---

**Ready to Experience It?**

1. Get your bot token from @BotFather
2. Configure .env file
3. Run `npm start`
4. Open Telegram and try it yourself!

May God bless you! 🙏
