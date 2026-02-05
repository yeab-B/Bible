/**
 * Bible Data Handler Module
 * Provides functions to load and access Bible data from bible.json
 */

const fs = require('fs');
const path = require('path');

class BibleDataHandler {
  constructor() {
    this.bibleData = null;
    this.loadBibleData();
  }

  /**
   * Load Bible data from JSON file
   */
  loadBibleData() {
    try {
      const filePath = path.join(__dirname, '../data/bible.json');
      const rawData = fs.readFileSync(filePath, 'utf8');
      this.bibleData = JSON.parse(rawData);
    } catch (error) {
      console.error('Error loading Bible data:', error);
      throw new Error('Failed to load Bible data');
    }
  }

  /**
   * Get all books in the Bible
   * @returns {Array} Array of book objects
   */
  getAllBooks() {
    return this.bibleData.books || [];
  }

  /**
   * Get a specific book by name
   * @param {string} bookName - Name of the book
   * @returns {Object|null} Book object or null if not found
   */
  getBookByName(bookName) {
    return this.bibleData.books.find(
      book => book.name.toLowerCase() === bookName.toLowerCase()
    ) || null;
  }

  /**
   * Get a specific book by ID
   * @param {number} bookId - ID of the book
   * @returns {Object|null} Book object or null if not found
   */
  getBookById(bookId) {
    return this.bibleData.books.find(book => book.id === bookId) || null;
  }

  /**
   * Get all chapters for a specific book
   * @param {string} bookName - Name of the book
   * @returns {Array|null} Array of chapter objects or null if book not found
   */
  getChapters(bookName) {
    const book = this.getBookByName(bookName);
    return book ? book.chapters : null;
  }

  /**
   * Get a specific chapter from a book
   * @param {string} bookName - Name of the book
   * @param {number} chapterNumber - Chapter number
   * @returns {Object|null} Chapter object or null if not found
   */
  getChapter(bookName, chapterNumber) {
    const chapters = this.getChapters(bookName);
    if (!chapters) return null;
    
    return chapters.find(chapter => chapter.chapter === chapterNumber) || null;
  }

  /**
   * Get all verses for a specific chapter
   * @param {string} bookName - Name of the book
   * @param {number} chapterNumber - Chapter number
   * @returns {Array|null} Array of verse objects or null if not found
   */
  getVerses(bookName, chapterNumber) {
    const chapter = this.getChapter(bookName, chapterNumber);
    return chapter ? chapter.verses : null;
  }

  /**
   * Get a specific verse
   * @param {string} bookName - Name of the book
   * @param {number} chapterNumber - Chapter number
   * @param {number} verseNumber - Verse number
   * @returns {Object|null} Verse object or null if not found
   */
  getVerse(bookName, chapterNumber, verseNumber) {
    const verses = this.getVerses(bookName, chapterNumber);
    if (!verses) return null;
    
    return verses.find(verse => verse.verse === verseNumber) || null;
  }

  /**
   * Get a random verse for daily verse feature
   * @returns {Object} Object containing book, chapter, verse, and text
   */
  getRandomVerse() {
    const books = this.getAllBooks();
    const randomBook = books[Math.floor(Math.random() * books.length)];
    const randomChapter = randomBook.chapters[Math.floor(Math.random() * randomBook.chapters.length)];
    const randomVerse = randomChapter.verses[Math.floor(Math.random() * randomChapter.verses.length)];
    
    return {
      book: randomBook.name,
      chapter: randomChapter.chapter,
      verse: randomVerse.verse,
      text: randomVerse.text
    };
  }

  /**
   * Format verse for display
   * @param {string} bookName - Name of the book
   * @param {number} chapter - Chapter number
   * @param {number} verse - Verse number
   * @param {string} text - Verse text
   * @returns {string} Formatted verse string
   */
  formatVerse(bookName, chapter, verse, text) {
    return `📖 ${bookName} ${chapter}:${verse}\n\n${text}`;
  }

  /**
   * Get total number of chapters in a book
   * @param {string} bookName - Name of the book
   * @returns {number} Number of chapters or 0 if book not found
   */
  getChapterCount(bookName) {
    const chapters = this.getChapters(bookName);
    return chapters ? chapters.length : 0;
  }

  /**
   * Get total number of verses in a chapter
   * @param {string} bookName - Name of the book
   * @param {number} chapterNumber - Chapter number
   * @returns {number} Number of verses or 0 if chapter not found
   */
  getVerseCount(bookName, chapterNumber) {
    const verses = this.getVerses(bookName, chapterNumber);
    return verses ? verses.length : 0;
  }
}

module.exports = BibleDataHandler;
