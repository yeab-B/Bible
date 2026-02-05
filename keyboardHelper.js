/**
 * Keyboard Helper Module
 * Provides functions to create inline keyboards for bot navigation
 */

/**
 * Create inline keyboard for book list
 * @param {Array} books - Array of book objects
 * @param {number} page - Current page number (for pagination)
 * @param {number} itemsPerPage - Number of items to show per page
 * @returns {Object} Inline keyboard markup
 */
function createBookListKeyboard(books, page = 0, itemsPerPage = 6) {
  const start = page * itemsPerPage;
  const end = start + itemsPerPage;
  const bookPage = books.slice(start, end);
  
  const keyboard = [];
  
  // Add book buttons (2 per row)
  for (let i = 0; i < bookPage.length; i += 2) {
    const row = [];
    row.push({
      text: bookPage[i].name,
      callback_data: `book_${bookPage[i].id}`
    });
    
    if (i + 1 < bookPage.length) {
      row.push({
        text: bookPage[i + 1].name,
        callback_data: `book_${bookPage[i + 1].id}`
      });
    }
    
    keyboard.push(row);
  }
  
  // Add navigation buttons
  const navRow = [];
  if (page > 0) {
    navRow.push({
      text: '⬅️ Previous',
      callback_data: `books_page_${page - 1}`
    });
  }
  
  if (end < books.length) {
    navRow.push({
      text: '➡️ Next',
      callback_data: `books_page_${page + 1}`
    });
  }
  
  if (navRow.length > 0) {
    keyboard.push(navRow);
  }
  
  return {
    inline_keyboard: keyboard
  };
}

/**
 * Create inline keyboard for chapter selection
 * @param {string} bookName - Name of the book
 * @param {number} chapterCount - Total number of chapters
 * @param {number} page - Current page number (for pagination)
 * @param {number} itemsPerPage - Number of items to show per page
 * @returns {Object} Inline keyboard markup
 */
function createChapterKeyboard(bookName, chapterCount, page = 0, itemsPerPage = 12) {
  const start = page * itemsPerPage;
  const end = Math.min(start + itemsPerPage, chapterCount);
  
  const keyboard = [];
  
  // Add chapter buttons (4 per row)
  let row = [];
  for (let i = start + 1; i <= end; i++) {
    row.push({
      text: `${i}`,
      callback_data: `chapter_${bookName}_${i}`
    });
    
    if (row.length === 4) {
      keyboard.push(row);
      row = [];
    }
  }
  
  // Add remaining buttons if any
  if (row.length > 0) {
    keyboard.push(row);
  }
  
  // Add navigation buttons
  const navRow = [];
  if (page > 0) {
    navRow.push({
      text: '⬅️ Previous',
      callback_data: `chapters_${bookName}_${page - 1}`
    });
  }
  
  if (end < chapterCount) {
    navRow.push({
      text: '➡️ Next',
      callback_data: `chapters_${bookName}_${page + 1}`
    });
  }
  
  if (navRow.length > 0) {
    keyboard.push(navRow);
  }
  
  // Add back button
  keyboard.push([{
    text: '🔙 Back to Books',
    callback_data: 'books_page_0'
  }]);
  
  return {
    inline_keyboard: keyboard
  };
}

/**
 * Create inline keyboard for verse selection
 * @param {string} bookName - Name of the book
 * @param {number} chapter - Chapter number
 * @param {number} verseCount - Total number of verses
 * @param {number} page - Current page number (for pagination)
 * @param {number} itemsPerPage - Number of items to show per page
 * @returns {Object} Inline keyboard markup
 */
function createVerseKeyboard(bookName, chapter, verseCount, page = 0, itemsPerPage = 12) {
  const start = page * itemsPerPage;
  const end = Math.min(start + itemsPerPage, verseCount);
  
  const keyboard = [];
  
  // Add verse buttons (4 per row)
  let row = [];
  for (let i = start + 1; i <= end; i++) {
    row.push({
      text: `${i}`,
      callback_data: `verse_${bookName}_${chapter}_${i}`
    });
    
    if (row.length === 4) {
      keyboard.push(row);
      row = [];
    }
  }
  
  // Add remaining buttons if any
  if (row.length > 0) {
    keyboard.push(row);
  }
  
  // Add "Read All" button
  keyboard.push([{
    text: '📖 Read All Verses',
    callback_data: `readall_${bookName}_${chapter}`
  }]);
  
  // Add navigation buttons
  const navRow = [];
  if (page > 0) {
    navRow.push({
      text: '⬅️ Previous',
      callback_data: `verses_${bookName}_${chapter}_${page - 1}`
    });
  }
  
  if (end < verseCount) {
    navRow.push({
      text: '➡️ Next',
      callback_data: `verses_${bookName}_${chapter}_${page + 1}`
    });
  }
  
  if (navRow.length > 0) {
    keyboard.push(navRow);
  }
  
  // Add back button
  keyboard.push([{
    text: '🔙 Back to Chapters',
    callback_data: `book_select_${bookName}`
  }]);
  
  return {
    inline_keyboard: keyboard
  };
}

/**
 * Create back navigation keyboard
 * @param {string} backAction - Callback data for back button
 * @returns {Object} Inline keyboard markup
 */
function createBackKeyboard(backAction) {
  return {
    inline_keyboard: [[{
      text: '🔙 Back',
      callback_data: backAction
    }]]
  };
}

module.exports = {
  createBookListKeyboard,
  createChapterKeyboard,
  createVerseKeyboard,
  createBackKeyboard
};
