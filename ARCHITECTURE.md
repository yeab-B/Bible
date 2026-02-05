# Project Architecture

## Overview

This document describes the professional folder structure for the Bible Telegram Bot project. The structure is designed to improve code organization, scalability, and maintainability.

## Folder Structure

```
Bible/
├── src/                          # Source code
│   ├── bot.js                    # Main bot application entry point
│   ├── config.js                 # Configuration management
│   ├── bibleDataHandler.js       # Bible data access layer
│   ├── commandHandlers.js        # Command handler functions
│   └── keyboardHelper.js         # Inline keyboard utilities
│
├── data/                         # Data files
│   └── bible.json                # Bible content (books, chapters, verses)
│
├── tests/                        # Test files
│   └── test.js                   # Validation test suite
│
├── docs/                         # Documentation
│   ├── FEATURES.md               # Complete feature showcase
│   ├── USAGE.md                  # Detailed usage instructions
│   ├── QUICKSTART.md             # Quick setup guide
│   ├── DEMO.md                   # Demo and examples
│   ├── SECURITY.md               # Security information
│   └── IMPLEMENTATION_SUMMARY.txt # Implementation details
│
├── README.md                     # Main project documentation
├── ARCHITECTURE.md               # This file - architecture documentation
├── package.json                  # Node.js project configuration
├── package-lock.json             # Dependency lock file
├── .gitignore                    # Git ignore rules
├── .env.example                  # Environment variable template
└── subscribers.json              # (Generated at runtime) User subscriptions

```

## Directory Descriptions

### `/src` - Source Code
Contains all application source code organized by functionality:

- **bot.js**: Main application entry point. Initializes the Telegram bot, loads data, sets up commands, and starts the cron scheduler.
- **config.js**: Centralized configuration management. Handles bot token, cron schedules, and display settings.
- **bibleDataHandler.js**: Data access layer for Bible content. Provides functions to load and query Bible data.
- **commandHandlers.js**: Command handler implementations for `/start`, `/dailyverse`, `/books`, `/read`, and `/help`.
- **keyboardHelper.js**: Utilities for creating inline keyboard buttons for interactive navigation.

### `/data` - Data Files
Stores static and dynamic data files:

- **bible.json**: Contains all Bible content in a structured JSON format (books, chapters, verses). This is the single source of truth for Bible content.

### `/tests` - Test Files
Contains all test and validation scripts:

- **test.js**: Comprehensive validation test suite that checks data integrity, configuration, helper functions, syntax, and dependencies.

### `/docs` - Documentation
Organized documentation for different aspects of the project:

- **FEATURES.md**: Comprehensive showcase of all implemented features with examples
- **USAGE.md**: Detailed usage instructions and troubleshooting guide
- **QUICKSTART.md**: Quick 5-minute setup guide for new users
- **DEMO.md**: Demo scenarios and example interactions
- **SECURITY.md**: Security considerations and best practices
- **IMPLEMENTATION_SUMMARY.txt**: Detailed implementation summary and statistics

### Root Directory
Essential project files:

- **README.md**: Main entry point for project documentation
- **ARCHITECTURE.md**: This file - documents the project structure
- **package.json**: Node.js project metadata and dependencies
- **.gitignore**: Specifies files to exclude from version control
- **.env.example**: Template for environment variables
- **subscribers.json**: Generated at runtime to store user subscriptions

## Design Principles

### 1. Separation of Concerns
- **Source code** (`src/`) is separated from **data** (`data/`), **tests** (`tests/`), and **documentation** (`docs/`)
- Each module has a single, well-defined responsibility

### 2. Modularity
- Code is split into logical modules that can be developed and tested independently
- Clear interfaces between modules (e.g., bibleDataHandler provides data access)

### 3. Scalability
- Structure supports easy addition of new features:
  - New commands can be added to `commandHandlers.js`
  - New keyboard layouts can be added to `keyboardHelper.js`
  - New data sources can be added to `data/`
  - New tests can be added to `tests/`

### 4. Maintainability
- Clear folder structure makes it easy to locate specific functionality
- Documentation is organized and comprehensive
- Test suite ensures code quality

### 5. Professional Standards
- Follows industry best practices for Node.js projects
- Logical organization that's intuitive for new contributors
- Proper separation of concerns

## File Relationships

### Dependency Graph

```
bot.js (main entry point)
├── config.js (configuration)
├── bibleDataHandler.js (data access)
│   └── data/bible.json
├── commandHandlers.js (command logic)
│   └── keyboardHelper.js (UI helpers)
└── node-telegram-bot-api (external)
```

### Import Paths

With the new structure, imports use relative paths:

```javascript
// In src/bot.js
const config = require('./config');
const bibleData = require('../data/bible.json');

// In tests/test.js
const config = require('../src/config');
const bibleData = require('../data/bible.json');
```

## Running the Application

### Development
```bash
npm start          # Starts the bot
npm test           # Runs validation tests
```

### File Locations
- **Entry point**: `src/bot.js` (configured in package.json)
- **Configuration**: `src/config.js` (or environment variables)
- **Data**: `data/bible.json`
- **Tests**: `tests/test.js`

## Adding New Features

### Adding a New Command
1. Implement handler function in `src/commandHandlers.js`
2. Register command in `src/bot.js`
3. Update documentation in `docs/USAGE.md` and `README.md`
4. Add test case in `tests/test.js`

### Adding New Data
1. Update `data/bible.json` with new content
2. Ensure data structure matches existing format
3. Run `npm test` to validate data integrity

### Adding New Documentation
1. Create new markdown file in `docs/`
2. Link from main `README.md`
3. Keep documentation up-to-date with code changes

## Benefits of This Structure

### For Developers
- **Clear organization**: Easy to find relevant code
- **Intuitive navigation**: Standard folder structure
- **Isolated concerns**: Changes in one area don't affect others
- **Easy testing**: Tests are separate from source code

### For Contributors
- **Lower barrier to entry**: Clear structure helps new contributors understand the project
- **Well-documented**: Comprehensive documentation in dedicated folder
- **Standard practices**: Follows Node.js conventions

### For Maintainers
- **Easier updates**: Clear separation makes refactoring safer
- **Better scalability**: Structure supports growth
- **Code quality**: Tests ensure changes don't break existing functionality

## Migration Notes

The project was restructured from a flat structure to this professional hierarchy. All file paths and imports have been updated accordingly:

- **Old**: Files in root directory (`./bot.js`, `./bible.json`)
- **New**: Organized into folders (`src/bot.js`, `data/bible.json`)

All existing functionality remains unchanged - only the organization has improved.

## Future Enhancements

The structure is designed to support future growth:

1. **Additional source modules**: Can add new files to `src/` (e.g., `src/database.js`, `src/api.js`)
2. **Multiple data sources**: Can add more data files to `data/` (e.g., `data/translations/`, `data/devotionals/`)
3. **Comprehensive testing**: Can add unit tests, integration tests to `tests/`
4. **Rich documentation**: Can continue expanding `docs/` with guides, tutorials, API docs

## Questions?

For questions about the architecture or suggestions for improvements, please open an issue on the GitHub repository.

---

**Last Updated**: February 2026  
**Version**: 1.0.0
