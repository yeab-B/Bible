const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const fs = require('fs');
const config = require('./config');

// Initialize bot
const bot = new TelegramBot(config.botToken, { polling: true });

// Load Bible data
let bibleData;
try {
  const rawData = fs.readFileSync('./bible.json', 'utf8');
  bibleData = JSON.parse(rawData);
} catch (error) {
  console.error('Error loading bible.json:', error);
  process.exit(1);
}

// Store user subscriptions for daily verses
const subscribers = new Set();

// ==================== Helper Functions ====================

/**
 * Get a random daily verse from the Bible
 */
function getDailyVerse() {
  const books = bibleData.books;
  const randomBook = books[Math.floor(Math.random() * books.length)];
  const randomChapter = randomBook.chapters[Math.floor(Math.random() * randomBook.chapters.length)];
  const randomVerse = randomChapter.verses[Math.floor(Math.random() * randomChapter.verses.length)];
  
  return {
    book: randomBook.name,
    chapter: randomChapter.chapter,
    verse: randomVerse.verse,
    text: randomVerse.text,
    reference: `${randomBook.name} ${randomChapter.chapter}:${randomVerse.verse}`
  };
}

/**
 * Format verse for display
 */
function formatVerse(book, chapter, verse, text) {
  return `📖 *${book} ${chapter}:${verse}*\n\n${text}`;
}

/**
 * Get book by name
 */
function getBook(bookName) {
  return bibleData.books.find(book => 
    book.name.toLowerCase() === bookName.toLowerCase()
  );
}

/**
 * Get chapter from book
 */
function getChapter(book, chapterNum) {
  return book.chapters.find(chapter => 
    chapter.chapter === parseInt(chapterNum)
  );
}

/**
 * Get verse from chapter
 */
function getVerse(chapter, verseNum) {
  return chapter.verses.find(verse => 
    verse.verse === parseInt(verseNum)
  );
}

// ==================== Command Handlers ====================

/**
 * /start command - Welcome message with daily verse
 */
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name || 'Friend';
  
  const dailyVerse = getDailyVerse();
  
  const welcomeMessage = `🌟 *Welcome to the Bible Bot, ${userName}!* 🌟\n\n` +
    `Good day! Here's your daily verse:\n\n` +
    formatVerse(dailyVerse.book, dailyVerse.chapter, dailyVerse.verse, dailyVerse.text) +
    `\n\n*Available Commands:*\n` +
    `/dailyverse - Get a new daily verse\n` +
    `/books - Browse all books of the Bible\n` +
    `/read - Read specific verses\n` +
    `/help - Show this help message`;
  
  bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'Markdown' });
  
  // Subscribe user to daily verses
  subscribers.add(chatId);
});

/**
 * /help command
 */
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  
  const helpMessage = `📚 *Bible Bot Help* 📚\n\n` +
    `*Commands:*\n` +
    `/start - Welcome message and daily verse\n` +
    `/dailyverse - Get a random daily verse\n` +
    `/books - Browse all books of the Bible\n` +
    `/read - Read specific verses (e.g., /read John 3:16)\n` +
    `/help - Show this help message\n\n` +
    `*How to use:*\n` +
    `1. Use /books to see all available books\n` +
    `2. Select a book to see its chapters\n` +
    `3. Select a chapter to read its verses\n` +
    `4. Use /read command for quick access (e.g., /read Psalms 23:1)`;
  
  bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
});

/**
 * /dailyverse command - Show a random daily verse
 */
bot.onText(/\/dailyverse/, (msg) => {
  const chatId = msg.chat.id;
  const dailyVerse = getDailyVerse();
  
  const message = `🌅 *Daily Verse* 🌅\n\n` +
    formatVerse(dailyVerse.book, dailyVerse.chapter, dailyVerse.verse, dailyVerse.text);
  
  bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
  
  // Subscribe user to daily verses
  subscribers.add(chatId);
});

/**
 * /books command - Show list of all books
 */
bot.onText(/\/books/, (msg) => {
  const chatId = msg.chat.id;
  
  // Create inline keyboard with book names
  const keyboard = [];
  const booksPerRow = 2;
  
  for (let i = 0; i < bibleData.books.length; i += booksPerRow) {
    const row = [];
    for (let j = 0; j < booksPerRow && i + j < bibleData.books.length; j++) {
      const book = bibleData.books[i + j];
      row.push({
        text: book.name,
        callback_data: `book_${book.name}`
      });
    }
    keyboard.push(row);
  }
  
  const options = {
    reply_markup: {
      inline_keyboard: keyboard
    }
  };
  
  bot.sendMessage(chatId, '📚 *Select a Book:*', { ...options, parse_mode: 'Markdown' });
});

/**
 * /read command - Read specific verses
 * Format: /read BookName Chapter:Verse
 * Example: /read John 3:16
 */
bot.onText(/\/read(?:\s+(.+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const input = match[1];
  
  if (!input) {
    bot.sendMessage(chatId, 
      '📖 *Usage:* /read BookName Chapter:Verse\n\n' +
      '*Examples:*\n' +
      '/read John 3:16\n' +
      '/read Psalms 23:1\n' +
      '/read Genesis 1:1',
      { parse_mode: 'Markdown' }
    );
    return;
  }
  
  // Parse input: "John 3:16" or "Genesis 1:1"
  const regex = /^(.+?)\s+(\d+):(\d+)$/;
  const match2 = input.match(regex);
  
  if (!match2) {
    bot.sendMessage(chatId, 
      '❌ *Invalid format!*\n\n' +
      'Please use: /read BookName Chapter:Verse\n' +
      'Example: /read John 3:16',
      { parse_mode: 'Markdown' }
    );
    return;
  }
  
  const bookName = match2[1].trim();
  const chapterNum = parseInt(match2[2]);
  const verseNum = parseInt(match2[3]);
  
  // Find the book
  const book = getBook(bookName);
  if (!book) {
    bot.sendMessage(chatId, 
      `❌ Book "${bookName}" not found!\n\n` +
      'Use /books to see available books.',
      { parse_mode: 'Markdown' }
    );
    return;
  }
  
  // Find the chapter
  const chapter = getChapter(book, chapterNum);
  if (!chapter) {
    bot.sendMessage(chatId, 
      `❌ Chapter ${chapterNum} not found in ${book.name}!\n\n` +
      `Available chapters: ${book.chapters.map(c => c.chapter).join(', ')}`
    );
    return;
  }
  
  // Find the verse
  const verse = getVerse(chapter, verseNum);
  if (!verse) {
    bot.sendMessage(chatId, 
      `❌ Verse ${verseNum} not found in ${book.name} ${chapterNum}!\n\n` +
      `Available verses: ${chapter.verses.map(v => v.verse).join(', ')}`
    );
    return;
  }
  
  // Send the verse
  const message = formatVerse(book.name, chapter.chapter, verse.verse, verse.text);
  bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
});

// ==================== Callback Query Handlers ====================

/**
 * Handle callback queries from inline keyboards
 */
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const data = query.data;
  
  // Answer callback query to remove loading state
  bot.answerCallbackQuery(query.id);
  
  // Handle book selection
  if (data.startsWith('book_')) {
    const bookName = data.substring(5);
    const book = getBook(bookName);
    
    if (!book) {
      bot.sendMessage(chatId, '❌ Book not found!');
      return;
    }
    
    // Create inline keyboard with chapters
    const keyboard = [];
    const chaptersPerRow = config.settings.chaptersPerRow;
    
    for (let i = 0; i < book.chapters.length; i += chaptersPerRow) {
      const row = [];
      for (let j = 0; j < chaptersPerRow && i + j < book.chapters.length; j++) {
        const chapter = book.chapters[i + j];
        row.push({
          text: `Ch ${chapter.chapter}`,
          callback_data: `chapter_${book.name}_${chapter.chapter}`
        });
      }
      keyboard.push(row);
    }
    
    // Add back button
    keyboard.push([{
      text: '« Back to Books',
      callback_data: 'back_to_books'
    }]);
    
    const options = {
      reply_markup: {
        inline_keyboard: keyboard
      },
      chat_id: chatId,
      message_id: messageId,
      parse_mode: 'Markdown'
    };
    
    bot.editMessageText(`📖 *${book.name}*\nSelect a chapter:`, options);
  }
  
  // Handle chapter selection
  else if (data.startsWith('chapter_')) {
    const parts = data.split('_');
    const bookName = parts[1];
    const chapterNum = parseInt(parts[2]);
    
    const book = getBook(bookName);
    if (!book) {
      bot.sendMessage(chatId, '❌ Book not found!');
      return;
    }
    
    const chapter = getChapter(book, chapterNum);
    if (!chapter) {
      bot.sendMessage(chatId, '❌ Chapter not found!');
      return;
    }
    
    // Display all verses in the chapter
    let message = `📖 *${book.name} ${chapter.chapter}*\n\n`;
    
    chapter.verses.forEach(verse => {
      message += `*${verse.verse}.* ${verse.text}\n\n`;
    });
    
    // Create inline keyboard with verse options
    const keyboard = [];
    
    // Add navigation button
    keyboard.push([{
      text: `« Back to ${book.name}`,
      callback_data: `book_${book.name}`
    }]);
    
    // Check message length (Telegram limit is 4096 characters)
    if (message.length > 4000) {
      // If message is too long, split it
      bot.sendMessage(chatId, message.substring(0, 4000) + '...', { parse_mode: 'Markdown' });
      bot.sendMessage(chatId, message.substring(4000), { 
        parse_mode: 'Markdown',
        reply_markup: { inline_keyboard: keyboard }
      });
    } else {
      const options = {
        reply_markup: {
          inline_keyboard: keyboard
        }
      };
      
      bot.sendMessage(chatId, message, { ...options, parse_mode: 'Markdown' });
    }
    
    // Delete the previous message with chapter selection
    bot.deleteMessage(chatId, messageId).catch(() => {});
  }
  
  // Handle back to books
  else if (data === 'back_to_books') {
    // Recreate books list
    const keyboard = [];
    const booksPerRow = 2;
    
    for (let i = 0; i < bibleData.books.length; i += booksPerRow) {
      const row = [];
      for (let j = 0; j < booksPerRow && i + j < bibleData.books.length; j++) {
        const book = bibleData.books[i + j];
        row.push({
          text: book.name,
          callback_data: `book_${book.name}`
        });
      }
      keyboard.push(row);
    }
    
    const options = {
      reply_markup: {
        inline_keyboard: keyboard
      },
      chat_id: chatId,
      message_id: messageId,
      parse_mode: 'Markdown'
    };
    
    bot.editMessageText('📚 *Select a Book:*', options);
  }
});

// ==================== Daily Verse Scheduler ====================

/**
 * Schedule daily verse to be sent to all subscribers
 */
cron.schedule(config.dailyVerseTime, () => {
  console.log('Sending daily verses to subscribers...');
  
  const dailyVerse = getDailyVerse();
  const message = `🌅 *Good Morning! Your Daily Verse* 🌅\n\n` +
    formatVerse(dailyVerse.book, dailyVerse.chapter, dailyVerse.verse, dailyVerse.text);
  
  subscribers.forEach(chatId => {
    bot.sendMessage(chatId, message, { parse_mode: 'Markdown' })
      .catch(error => {
        console.error(`Failed to send to ${chatId}:`, error.message);
        // Remove subscriber if they blocked the bot
        if (error.response && error.response.statusCode === 403) {
          subscribers.delete(chatId);
        }
      });
  });
});

// ==================== Error Handling ====================

bot.on('polling_error', (error) => {
  console.error('Polling error:', error.message);
});

bot.on('error', (error) => {
  console.error('Bot error:', error.message);
});

// ==================== Start Bot ====================

console.log('✅ Bible Bot is running...');
console.log(`📅 Daily verses scheduled at: ${config.dailyVerseTime}`);
console.log('📖 Loaded Bible data with', bibleData.books.length, 'books');
console.log('🤖 Bot is ready to receive commands!');
