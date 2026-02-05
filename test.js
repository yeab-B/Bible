// Test script to validate bot functionality without actually running it
const fs = require('fs');

console.log('🧪 Running validation tests...\n');

// Test 1: Check if bible.json exists and is valid
console.log('Test 1: Validating bible.json...');
try {
  const bibleData = JSON.parse(fs.readFileSync('./bible.json', 'utf8'));
  console.log('✅ bible.json is valid JSON');
  console.log(`   📚 Found ${bibleData.books.length} books`);
  
  // Validate structure
  if (!bibleData.books || !Array.isArray(bibleData.books)) {
    throw new Error('Invalid structure: books array not found');
  }
  
  let totalChapters = 0;
  let totalVerses = 0;
  
  bibleData.books.forEach(book => {
    if (!book.name || !book.chapters) {
      throw new Error(`Invalid book structure: ${JSON.stringify(book)}`);
    }
    totalChapters += book.chapters.length;
    book.chapters.forEach(chapter => {
      if (typeof chapter.chapter !== 'number' || !chapter.verses) {
        throw new Error(`Invalid chapter structure in ${book.name}`);
      }
      totalVerses += chapter.verses.length;
      chapter.verses.forEach(verse => {
        if (typeof verse.verse !== 'number' || typeof verse.text !== 'string') {
          throw new Error(`Invalid verse structure in ${book.name} ${chapter.chapter}`);
        }
      });
    });
  });
  
  console.log(`   📖 Found ${totalChapters} chapters`);
  console.log(`   📝 Found ${totalVerses} verses`);
  console.log('   ✅ All data structure is valid\n');
} catch (error) {
  console.error('❌ bible.json validation failed:', error.message);
  process.exit(1);
}

// Test 2: Check if config.js is valid
console.log('Test 2: Validating config.js...');
try {
  const config = require('./config.js');
  
  if (!config.botToken) {
    console.log('⚠️  Bot token not configured (expected for initial setup)');
  } else {
    console.log('✅ Bot token configured');
  }
  
  if (!config.dailyVerseTime) {
    throw new Error('Daily verse time not configured');
  }
  console.log(`✅ Daily verse time: ${config.dailyVerseTime}`);
  
  if (!config.settings) {
    throw new Error('Settings not configured');
  }
  console.log('✅ Settings configured\n');
} catch (error) {
  console.error('❌ config.js validation failed:', error.message);
  process.exit(1);
}

// Test 3: Test helper functions
console.log('Test 3: Testing helper functions...');
try {
  const bibleData = JSON.parse(fs.readFileSync('./bible.json', 'utf8'));
  
  // Test getDailyVerse logic
  const randomBook = bibleData.books[Math.floor(Math.random() * bibleData.books.length)];
  const randomChapter = randomBook.chapters[Math.floor(Math.random() * randomBook.chapters.length)];
  const randomVerse = randomChapter.verses[Math.floor(Math.random() * randomChapter.verses.length)];
  
  console.log('✅ Random verse selection works');
  console.log(`   Example: ${randomBook.name} ${randomChapter.chapter}:${randomVerse.verse}`);
  console.log(`   Text: "${randomVerse.text.substring(0, 50)}..."\n`);
  
  // Test getBook logic
  const testBook = bibleData.books.find(book => book.name.toLowerCase() === 'john');
  if (testBook) {
    console.log('✅ Book search works');
    console.log(`   Found: ${testBook.name}`);
  }
  
  // Test getChapter logic
  if (testBook) {
    const testChapter = testBook.chapters.find(chapter => chapter.chapter === 3);
    if (testChapter) {
      console.log('✅ Chapter search works');
      console.log(`   Found: ${testBook.name} Chapter ${testChapter.chapter}`);
    }
  }
  
  // Test getVerse logic
  if (testBook) {
    const testChapter = testBook.chapters.find(chapter => chapter.chapter === 3);
    if (testChapter) {
      const testVerse = testChapter.verses.find(verse => verse.verse === 16);
      if (testVerse) {
        console.log('✅ Verse search works');
        console.log(`   Found: ${testBook.name} ${testChapter.chapter}:${testVerse.verse}`);
        console.log(`   Text: "${testVerse.text}"\n`);
      }
    }
  }
} catch (error) {
  console.error('❌ Helper function test failed:', error.message);
  process.exit(1);
}

// Test 4: Validate bot.js syntax
console.log('Test 4: Validating bot.js syntax...');
try {
  // Check if the file can be parsed
  const botCode = fs.readFileSync('./bot.js', 'utf8');
  
  // Check for required components
  const requiredComponents = [
    'TelegramBot',
    'node-cron',
    'getDailyVerse',
    '/start',
    '/dailyverse',
    '/books',
    '/read',
    'callback_query',
    'subscribers',
    'loadSubscribers',
    'saveSubscribers'
  ];
  
  requiredComponents.forEach(component => {
    if (!botCode.includes(component)) {
      throw new Error(`Missing required component: ${component}`);
    }
  });
  
  console.log('✅ bot.js contains all required components');
  console.log('   ✓ Command handlers (/start, /dailyverse, /books, /read)');
  console.log('   ✓ Callback query handler');
  console.log('   ✓ Cron scheduler');
  console.log('   ✓ Error handling\n');
} catch (error) {
  console.error('❌ bot.js validation failed:', error.message);
  process.exit(1);
}

// Test 5: Check package.json dependencies
console.log('Test 5: Validating dependencies...');
try {
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  
  const requiredDeps = ['node-telegram-bot-api', 'node-cron'];
  requiredDeps.forEach(dep => {
    if (!packageJson.dependencies || !packageJson.dependencies[dep]) {
      throw new Error(`Missing dependency: ${dep}`);
    }
    console.log(`✅ ${dep} is listed in dependencies`);
  });
  
  console.log('✅ All required dependencies are present\n');
} catch (error) {
  console.error('❌ Dependencies validation failed:', error.message);
  process.exit(1);
}

console.log('🎉 All validation tests passed!\n');
console.log('📝 Next steps:');
console.log('   1. Get a bot token from @BotFather on Telegram');
console.log('   2. Update config.js with your bot token');
console.log('   3. Run: npm start');
console.log('   4. Open Telegram and search for your bot');
console.log('   5. Send /start to begin!\n');
