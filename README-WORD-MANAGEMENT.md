# Hangman Game - Word Management System

## Overview

This document describes the new modular word management system for the Hangman game, which allows for easy organization of words by subject and grade level.

## System Architecture

### Core Components

1. **WordManager Class** (`word-manager.js`)
   - Centralized word management system
   - Handles loading words from subject files
   - Provides fallback words when loading fails
   - Manages grade and subject settings

2. **Subject Files** (`subjects/` directory)
   - `english.js` - English vocabulary words
   - `science.js` - Science terminology
   - `social.js` - Social studies concepts
   - `computer.js` - Computer science terms
   - `gk.js` - General knowledge topics

3. **Admin Interface** (`admin.html`)
   - Web-based interface for managing words
   - Add, edit, delete words
   - Bulk import/export functionality
   - Statistics and analytics

4. **Word Upload Interface** (`word-upload.html`)
   - Simple interface for uploading words
   - Support for JSON file uploads
   - Manual entry forms
   - Quick single-word addition

## File Structure

```
hangman-game/
├── word-manager.js          # Core word management system
├── subjects/                # Subject-specific word files
│   ├── english.js
│   ├── science.js
│   ├── social.js
│   ├── computer.js
│   └── gk.js
├── admin.html              # Admin panel for word management
├── word-upload.html        # Simple word upload interface
├── game.html              # Main game (updated)
├── offline-game.html      # Offline game (updated)
├── online-game.html       # Online game (updated)
└── README-WORD-MANAGEMENT.md
```

## How to Use

### For Teachers/Administrators

1. **Access Admin Panel**
   - Open `admin.html` in a web browser
   - Use the interface to manage words by subject and grade

2. **Add Words Manually**
   - Use the "Add New Word" form
   - Select subject and grade
   - Enter word and hint
   - Click "Add Word"

3. **Bulk Import**
   - Prepare a JSON file with word data
   - Use the "Bulk Import" section
   - Paste JSON or upload file
   - Click "Import Words"

4. **Word Upload Interface**
   - Open `word-upload.html` for simpler interface
   - Upload JSON files or enter words manually
   - Use the quick-add form for single words

### For Developers

1. **Adding New Subjects**
   - Create a new file in `subjects/` directory
   - Follow the format: `export default { '1': [...], '2': [...], ... }`
   - Update `word-manager.js` to include the new subject

2. **Modifying Word Lists**
   - Edit the appropriate subject file
   - Add/remove words for specific grades
   - Ensure proper formatting

3. **Customizing Word Manager**
   - Modify `word-manager.js` for additional functionality
   - Add new methods for word management
   - Implement persistence if needed

## Word Data Format

### Individual Word Object
```javascript
{
  word: "COMPUTER",           // Word in uppercase
  hint: "Electronic device"   // Hint for the word
}
```

### Subject File Format
```javascript
export default {
  '1': [                     // Grade 1 words
    { word: "CAT", hint: "A pet animal" },
    { word: "DOG", hint: "Man's best friend" }
  ],
  '2': [                     // Grade 2 words
    { word: "HOUSE", hint: "Where we live" },
    { word: "TREE", hint: "Tall plant" }
  ]
  // ... more grades
};
```

### JSON Import Format
```json
[
  {
    "word": "COMPUTER",
    "hint": "Electronic device",
    "subject": "computer",
    "grade": "1"
  },
  {
    "word": "PROGRAMMING",
    "hint": "Writing code",
    "subject": "computer",
    "grade": "5"
  }
]
```

## Grade Levels

The system supports 6 grade levels:
- **Grade 1**: Basic vocabulary (3-4 letter words)
- **Grade 2**: Simple words (4-5 letter words)
- **Grade 3**: Intermediate words (5-6 letter words)
- **Grade 4**: Advanced words (6-8 letter words)
- **Grade 5**: Complex words (7-10 letter words)
- **Grade 6**: Expert words (8+ letter words)

## Subjects

1. **English**: Vocabulary, grammar, literature
2. **Science**: Biology, physics, chemistry, earth science
3. **Social Studies**: History, geography, civics, culture
4. **Computer Science**: Programming, technology, digital literacy
5. **General Knowledge**: Trivia, facts, general information

## Features

### Word Management
- ✅ Grade-based organization
- ✅ Subject-specific categorization
- ✅ Easy word addition/removal
- ✅ Bulk import/export
- ✅ Fallback word system
- ✅ Statistics and analytics

### Admin Interface
- ✅ Web-based management
- ✅ Real-time preview
- ✅ Search and filter
- ✅ Export functionality
- ✅ Data validation

### Game Integration
- ✅ Seamless integration with existing games
- ✅ Dynamic word loading
- ✅ Grade-appropriate difficulty
- ✅ Subject-specific content

## Usage Examples

### Adding a Single Word
```javascript
wordManager.addWord('5', 'computer', 'ALGORITHM', 'Step by step solution');
```

### Getting Random Word
```javascript
wordManager.setGameSettings('3', 'science');
const word = wordManager.getRandomWord();
console.log(word.word);    // "ENERGY"
console.log(word.hint);    // "Power source"
```

### Getting All Words for Grade/Subject
```javascript
const words = wordManager.getAllWords('4', 'english');
console.log(words.length); // Number of words available
```

## Troubleshooting

### Common Issues

1. **Words not loading**
   - Check browser console for errors
   - Ensure subject files are properly formatted
   - Verify file paths are correct

2. **Import errors**
   - Validate JSON format
   - Check required fields (word, hint, subject, grade)
   - Ensure grade is string format ('1', '2', etc.)

3. **Game not using new words**
   - Clear browser cache
   - Restart the game
   - Check localStorage for cached data

### Debug Mode

Enable debug logging by opening browser console and looking for:
- `✅ Loaded [subject] words: X grades`
- `⚠️ Could not load [subject] words`
- `❌ Error loading words`

## Future Enhancements

- [ ] Database integration for persistent storage
- [ ] User authentication for admin access
- [ ] Word difficulty scoring
- [ ] Analytics and reporting
- [ ] Multi-language support
- [ ] Word categories and tags
- [ ] Import from external sources (CSV, Excel)
- [ ] Word validation and quality checks

## Support

For issues or questions about the word management system:
1. Check this documentation
2. Review browser console for errors
3. Verify file formats and data structure
4. Test with fallback words to isolate issues

## License

This word management system is part of the Hangman game project and follows the same licensing terms.
