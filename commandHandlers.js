/**
 * Command Handlers Module
 * Contains handlers for all bot commands and callback queries
 */

const {
  createBookListKeyboard,
  createChapterKeyboard,
  createVerseKeyboard
} = require('./keyboardHelper');

/**
 * Handle /start command
 * Shows welcome message with a random daily verse
 */
function handleStartCommand(bot, bibleHandler) {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const dailyVerse = bibleHandler.getRandomVerse();
    
    const welcomeMessage = `
🙏 Welcome to the Bible Bot! 🙏

Here's your daily verse:

${bibleHandler.formatVerse(dailyVerse.book, dailyVerse.chapter, dailyVerse.verse, dailyVerse.text)}

📚 Available Commands:
/dailyverse - Get a random daily verse
/books - Browse books of the Bible
/read - Start reading the Bible
/help - Show this help message
`;
    
    bot.sendMessage(chatId, welcomeMessage);
  });
}

/**
 * Handle /help command
 * Shows available commands
 */
function handleHelpCommand(bot) {
  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    
    const helpMessage = `
📖 Bible Bot Help

Available Commands:
/start - Welcome message with daily verse
/dailyverse - Get a random daily verse
/books - Browse and select books
/read - Start reading the Bible
/help - Show this help message

How to use:
1. Use /books to see all Bible books
2. Click on a book to see its chapters
3. Select a chapter to see verses
4. Click on a verse to read it, or read all verses at once

May God bless you! 🙏
`;
    
    bot.sendMessage(chatId, helpMessage);
  });
}

/**
 * Handle /dailyverse command
 * Sends a random verse
 */
function handleDailyVerseCommand(bot, bibleHandler) {
  bot.onText(/\/dailyverse/, (msg) => {
    const chatId = msg.chat.id;
    const dailyVerse = bibleHandler.getRandomVerse();
    
    const message = `
✨ Daily Verse ✨

${bibleHandler.formatVerse(dailyVerse.book, dailyVerse.chapter, dailyVerse.verse, dailyVerse.text)}

God bless you! 🙏
`;
    
    bot.sendMessage(chatId, message);
  });
}

/**
 * Handle /books command
 * Shows list of all books
 */
function handleBooksCommand(bot, bibleHandler) {
  bot.onText(/\/books/, (msg) => {
    const chatId = msg.chat.id;
    const books = bibleHandler.getAllBooks();
    
    const keyboard = createBookListKeyboard(books);
    
    bot.sendMessage(chatId, '📚 Select a book from the Bible:', {
      reply_markup: keyboard
    });
  });
}

/**
 * Handle /read command
 * Alias for /books command
 */
function handleReadCommand(bot, bibleHandler) {
  bot.onText(/\/read/, (msg) => {
    const chatId = msg.chat.id;
    const books = bibleHandler.getAllBooks();
    
    const keyboard = createBookListKeyboard(books);
    
    bot.sendMessage(chatId, '📖 Choose a book to start reading:', {
      reply_markup: keyboard
    });
  });
}

/**
 * Handle callback queries (button clicks)
 */
function handleCallbackQuery(bot, bibleHandler) {
  bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;
    const data = query.data;
    
    // Handle book pagination
    if (data.startsWith('books_page_')) {
      const page = parseInt(data.split('_')[2]);
      const books = bibleHandler.getAllBooks();
      const keyboard = createBookListKeyboard(books, page);
      
      bot.editMessageText('📚 Select a book from the Bible:', {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: keyboard
      });
      
      bot.answerCallbackQuery(query.id);
      return;
    }
    
    // Handle book selection
    if (data.startsWith('book_')) {
      const bookId = parseInt(data.split('_')[1]);
      const book = bibleHandler.getBookById(bookId);
      
      if (!book) {
        bot.answerCallbackQuery(query.id, {
          text: '❌ Book not found!',
          show_alert: true
        });
        return;
      }
      
      const chapterCount = book.chapters.length;
      const keyboard = createChapterKeyboard(book.name, chapterCount);
      
      bot.editMessageText(`📖 ${book.name}\n\nSelect a chapter (${chapterCount} chapters available):`, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: keyboard
      });
      
      bot.answerCallbackQuery(query.id);
      return;
    }
    
    // Handle book selection for chapter navigation (back button)
    if (data.startsWith('book_select_')) {
      const bookName = data.replace('book_select_', '');
      const book = bibleHandler.getBookByName(bookName);
      
      if (!book) {
        bot.answerCallbackQuery(query.id, {
          text: '❌ Book not found!',
          show_alert: true
        });
        return;
      }
      
      const chapterCount = book.chapters.length;
      const keyboard = createChapterKeyboard(book.name, chapterCount);
      
      bot.editMessageText(`📖 ${book.name}\n\nSelect a chapter (${chapterCount} chapters available):`, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: keyboard
      });
      
      bot.answerCallbackQuery(query.id);
      return;
    }
    
    // Handle chapter pagination
    if (data.startsWith('chapters_')) {
      const parts = data.split('_');
      const bookName = parts.slice(1, -1).join('_');
      const page = parseInt(parts[parts.length - 1]);
      const book = bibleHandler.getBookByName(bookName);
      
      if (!book) {
        bot.answerCallbackQuery(query.id, {
          text: '❌ Book not found!',
          show_alert: true
        });
        return;
      }
      
      const chapterCount = book.chapters.length;
      const keyboard = createChapterKeyboard(bookName, chapterCount, page);
      
      bot.editMessageText(`📖 ${bookName}\n\nSelect a chapter (${chapterCount} chapters available):`, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: keyboard
      });
      
      bot.answerCallbackQuery(query.id);
      return;
    }
    
    // Handle chapter selection
    if (data.startsWith('chapter_')) {
      const parts = data.split('_');
      const bookName = parts.slice(1, -1).join('_');
      const chapterNum = parseInt(parts[parts.length - 1]);
      
      const chapter = bibleHandler.getChapter(bookName, chapterNum);
      
      if (!chapter) {
        bot.answerCallbackQuery(query.id, {
          text: '❌ Chapter not found!',
          show_alert: true
        });
        return;
      }
      
      const verseCount = chapter.verses.length;
      const keyboard = createVerseKeyboard(bookName, chapterNum, verseCount);
      
      bot.editMessageText(`📖 ${bookName} ${chapterNum}\n\nSelect a verse (${verseCount} verses available):`, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: keyboard
      });
      
      bot.answerCallbackQuery(query.id);
      return;
    }
    
    // Handle verse pagination
    if (data.startsWith('verses_')) {
      const parts = data.split('_');
      const page = parseInt(parts[parts.length - 1]);
      const chapterNum = parseInt(parts[parts.length - 2]);
      const bookName = parts.slice(1, -2).join('_');
      
      const verseCount = bibleHandler.getVerseCount(bookName, chapterNum);
      const keyboard = createVerseKeyboard(bookName, chapterNum, verseCount, page);
      
      bot.editMessageText(`📖 ${bookName} ${chapterNum}\n\nSelect a verse (${verseCount} verses available):`, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: keyboard
      });
      
      bot.answerCallbackQuery(query.id);
      return;
    }
    
    // Handle single verse selection
    if (data.startsWith('verse_')) {
      const parts = data.split('_');
      const verseNum = parseInt(parts[parts.length - 1]);
      const chapterNum = parseInt(parts[parts.length - 2]);
      const bookName = parts.slice(1, -2).join('_');
      
      const verse = bibleHandler.getVerse(bookName, chapterNum, verseNum);
      
      if (!verse) {
        bot.answerCallbackQuery(query.id, {
          text: '❌ Verse not found!',
          show_alert: true
        });
        return;
      }
      
      const message = bibleHandler.formatVerse(bookName, chapterNum, verseNum, verse.text);
      
      // Send new message with the verse
      bot.sendMessage(chatId, message);
      
      bot.answerCallbackQuery(query.id, {
        text: '✅ Verse loaded!'
      });
      return;
    }
    
    // Handle "Read All" verses
    if (data.startsWith('readall_')) {
      const parts = data.split('_');
      const chapterNum = parseInt(parts[parts.length - 1]);
      const bookName = parts.slice(1, -1).join('_');
      
      const verses = bibleHandler.getVerses(bookName, chapterNum);
      
      if (!verses || verses.length === 0) {
        bot.answerCallbackQuery(query.id, {
          text: '❌ No verses found!',
          show_alert: true
        });
        return;
      }
      
      // Format all verses
      let message = `📖 ${bookName} ${chapterNum}\n\n`;
      verses.forEach(verse => {
        message += `${verse.verse}. ${verse.text}\n\n`;
      });
      
      // Telegram has a message length limit, so split if necessary
      if (message.length > 4096) {
        const chunks = message.match(/[\s\S]{1,4096}/g) || [];
        chunks.forEach(chunk => {
          bot.sendMessage(chatId, chunk);
        });
      } else {
        bot.sendMessage(chatId, message);
      }
      
      bot.answerCallbackQuery(query.id, {
        text: '✅ Chapter loaded!'
      });
      return;
    }
    
    // Default handler for unknown callbacks
    bot.answerCallbackQuery(query.id, {
      text: '❌ Unknown action!',
      show_alert: true
    });
  });
}

module.exports = {
  handleStartCommand,
  handleHelpCommand,
  handleDailyVerseCommand,
  handleBooksCommand,
  handleReadCommand,
  handleCallbackQuery
};
