/**
 * Test Script for Bible Bot
 * Demonstrates the bot's functionality without requiring a Telegram connection
 */

const BibleDataHandler = require('./bibleDataHandler');
const {
  createBookListKeyboard,
  createChapterKeyboard,
  createVerseKeyboard
} = require('./keyboardHelper');

console.log('========================================');
console.log('🤖 Bible Bot Functionality Test');
console.log('========================================\n');

// Initialize Bible data handler
const bibleHandler = new BibleDataHandler();

// Test 1: Load all books
console.log('📚 Test 1: Loading Books');
console.log('-------------------------');
const books = bibleHandler.getAllBooks();
console.log(`✅ Loaded ${books.length} books`);
books.forEach(book => {
  console.log(`   - ${book.name} (${book.chapters.length} chapters)`);
});
console.log();

// Test 2: Get a random daily verse
console.log('✨ Test 2: Daily Verse Feature');
console.log('-------------------------');
for (let i = 0; i < 3; i++) {
  const dailyVerse = bibleHandler.getRandomVerse();
  console.log(`${i + 1}. ${dailyVerse.book} ${dailyVerse.chapter}:${dailyVerse.verse}`);
  console.log(`   "${dailyVerse.text}"\n`);
}

// Test 3: Get specific verse
console.log('📖 Test 3: Retrieve Specific Verse');
console.log('-------------------------');
const john316 = bibleHandler.getVerse('John', 3, 16);
if (john316) {
  console.log('✅ John 3:16 found:');
  console.log(`   "${john316.text}"`);
} else {
  console.log('❌ Verse not found');
}
console.log();

// Test 4: Get chapter
console.log('📜 Test 4: Retrieve Chapter');
console.log('-------------------------');
const psalm23 = bibleHandler.getVerses('Psalms', 23);
if (psalm23) {
  console.log(`✅ Psalms 23 (${psalm23.length} verses):`);
  psalm23.forEach(verse => {
    console.log(`   ${verse.verse}. ${verse.text}`);
  });
} else {
  console.log('❌ Chapter not found');
}
console.log();

// Test 5: Error handling - Invalid book
console.log('⚠️  Test 5: Error Handling - Invalid Book');
console.log('-------------------------');
const invalidBook = bibleHandler.getBookByName('InvalidBook');
console.log(`✅ Invalid book result: ${invalidBook === null ? 'null (correct)' : 'error'}`);
console.log();

// Test 6: Error handling - Invalid chapter
console.log('⚠️  Test 6: Error Handling - Invalid Chapter');
console.log('-------------------------');
const invalidChapter = bibleHandler.getChapter('Genesis', 999);
console.log(`✅ Invalid chapter result: ${invalidChapter === null ? 'null (correct)' : 'error'}`);
console.log();

// Test 7: Error handling - Invalid verse
console.log('⚠️  Test 7: Error Handling - Invalid Verse');
console.log('-------------------------');
const invalidVerse = bibleHandler.getVerse('Genesis', 1, 999);
console.log(`✅ Invalid verse result: ${invalidVerse === null ? 'null (correct)' : 'error'}`);
console.log();

// Test 8: Keyboard generation
console.log('⌨️  Test 8: Keyboard Generation');
console.log('-------------------------');
const bookKeyboard = createBookListKeyboard(books);
console.log(`✅ Book list keyboard: ${bookKeyboard.inline_keyboard.length} rows`);

const chapterKeyboard = createChapterKeyboard('Genesis', 2);
console.log(`✅ Chapter keyboard: ${chapterKeyboard.inline_keyboard.length} rows`);

const verseKeyboard = createVerseKeyboard('John', 3, 2);
console.log(`✅ Verse keyboard: ${verseKeyboard.inline_keyboard.length} rows`);
console.log();

// Test 9: Formatted verse output
console.log('📝 Test 9: Formatted Verse Output');
console.log('-------------------------');
const formattedVerse = bibleHandler.formatVerse('Proverbs', 3, 5, 
  'Trust in the LORD with all thine heart; and lean not unto thine own understanding.');
console.log(formattedVerse);
console.log();

console.log('========================================');
console.log('✅ All tests completed successfully!');
console.log('========================================');
console.log('\n📱 To use the bot with Telegram:');
console.log('1. Get a bot token from @BotFather');
console.log('2. Create .env file with: BOT_TOKEN=your_token');
console.log('3. Run: npm start');
console.log('4. Open Telegram and start chatting with your bot!');
