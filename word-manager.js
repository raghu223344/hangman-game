// ====================== WORD MANAGER SYSTEM ======================
// Centralized word management with grade-based organization

class WordManager {
  constructor() {
    this.words = {};
    this.currentGrade = '1';
    this.currentSubject = 'english';
    this.loadWords();
  }

  // Load words from all subject files
  async loadWords() {
    try {
      // Load each subject's words
      const subjects = ['english', 'science', 'social', 'computer', 'gk'];
      
      for (const subject of subjects) {
        try {
          const module = await import(`./subjects/${subject}.js`);
          this.words[subject] = module.default || module;
          console.log(`✅ Loaded ${subject} words:`, Object.keys(this.words[subject]).length, 'grades');
        } catch (error) {
          console.warn(`⚠️ Could not load ${subject} words:`, error.message);
          // Fallback to basic words
          this.words[subject] = this.getFallbackWords(subject);
        }
      }
    } catch (error) {
      console.error('❌ Error loading words:', error);
      this.words = this.getFallbackWords();
    }
  }

  // Set current grade and subject
  setGameSettings(grade, subject) {
    this.currentGrade = grade.toString();
    this.currentSubject = subject.toLowerCase();
  }

  // Get random word for current settings
  getRandomWord() {
    const subjectWords = this.words[this.currentSubject];
    if (!subjectWords) {
      console.warn(`Subject ${this.currentSubject} not found, using English`);
      return this.getRandomWordFromSubject('english');
    }

    return this.getRandomWordFromSubject(this.currentSubject);
  }

  // Get random word from specific subject
  getRandomWordFromSubject(subject) {
    const subjectWords = this.words[subject];
    if (!subjectWords) {
      return this.getFallbackWord(subject);
    }

    // Get words for current grade
    const gradeWords = subjectWords[this.currentGrade] || subjectWords['1'] || [];
    
    if (gradeWords.length === 0) {
      console.warn(`No words found for grade ${this.currentGrade} in ${subject}, using fallback`);
      return this.getFallbackWord(subject);
    }

    const randomIndex = Math.floor(Math.random() * gradeWords.length);
    return gradeWords[randomIndex];
  }

  // Get all words for a specific grade and subject
  getAllWords(grade, subject) {
    const subjectWords = this.words[subject.toLowerCase()];
    if (!subjectWords) return [];

    return subjectWords[grade.toString()] || subjectWords['1'] || [];
  }

  // Add new word to a specific grade and subject
  addWord(grade, subject, word, hint) {
    if (!this.words[subject]) {
      this.words[subject] = {};
    }
    if (!this.words[subject][grade]) {
      this.words[subject][grade] = [];
    }
    
    this.words[subject][grade].push({ word: word.toUpperCase(), hint });
    console.log(`✅ Added word "${word}" to ${subject} grade ${grade}`);
  }

  // Get fallback words when loading fails
  getFallbackWords(subject = null) {
    const fallbackWords = {
      english: {
        '1': [
          { word: "CAT", hint: "A pet animal" },
          { word: "DOG", hint: "Man's best friend" },
          { word: "SUN", hint: "Bright in the sky" },
          { word: "MOON", hint: "Shines at night" }
        ],
        '2': [
          { word: "HOUSE", hint: "Where we live" },
          { word: "TREE", hint: "Tall plant" },
          { word: "WATER", hint: "Clear liquid" },
          { word: "BREAD", hint: "Food we eat" }
        ],
        '3': [
          { word: "SCHOOL", hint: "Place of learning" },
          { word: "FRIEND", hint: "Someone you like" },
          { word: "FAMILY", hint: "People related to you" },
          { word: "HAPPY", hint: "Feeling good" }
        ],
        '4': [
          { word: "ELEPHANT", hint: "Large animal with trunk" },
          { word: "BUTTERFLY", hint: "Colorful flying insect" },
          { word: "RAINBOW", hint: "Colorful arc in sky" },
          { word: "ADVENTURE", hint: "Exciting journey" }
        ],
        '5': [
          { word: "COMPUTER", hint: "Electronic device" },
          { word: "JOURNEY", hint: "Long trip" },
          { word: "MYSTERY", hint: "Something unknown" },
          { word: "TREASURE", hint: "Valuable find" }
        ],
        '6': [
          { word: "IMAGINATION", hint: "Creative thinking" },
          { word: "KNOWLEDGE", hint: "What you learn" },
          { word: "EXPERIENCE", hint: "What you go through" },
          { word: "CHALLENGE", hint: "Difficult task" }
        ]
      },
      science: {
        '1': [
          { word: "SUN", hint: "Gives us light" },
          { word: "TREE", hint: "Plant with leaves" },
          { word: "WATER", hint: "Clear liquid" },
          { word: "ROCK", hint: "Hard stone" }
        ],
        '2': [
          { word: "PLANT", hint: "Grows in soil" },
          { word: "ANIMAL", hint: "Living creature" },
          { word: "EARTH", hint: "Our planet" },
          { word: "WIND", hint: "Moving air" }
        ],
        '3': [
          { word: "ENERGY", hint: "Power source" },
          { word: "GRAVITY", hint: "Pulls things down" },
          { word: "MATTER", hint: "Everything around us" },
          { word: "FORCE", hint: "Push or pull" }
        ],
        '4': [
          { word: "ATOM", hint: "Smallest unit of matter" },
          { word: "MOLECULE", hint: "Group of atoms" },
          { word: "ECOSYSTEM", hint: "Living community" },
          { word: "EVOLUTION", hint: "Change over time" }
        ],
        '5': [
          { word: "PHOTOSYNTHESIS", hint: "How plants make food" },
          { word: "MAGNETISM", hint: "Attraction force" },
          { word: "ELECTRICITY", hint: "Electrical energy" },
          { word: "CHEMISTRY", hint: "Study of matter" }
        ],
        '6': [
          { word: "PHYSICS", hint: "Study of motion and energy" },
          { word: "BIOLOGY", hint: "Study of living things" },
          { word: "GEOLOGY", hint: "Study of Earth" },
          { word: "ASTRONOMY", hint: "Study of space" }
        ]
      },
      social: {
        '1': [
          { word: "HOME", hint: "Where you live" },
          { word: "FAMILY", hint: "Your relatives" },
          { word: "FRIEND", hint: "Someone you like" },
          { word: "SCHOOL", hint: "Place to learn" }
        ],
        '2': [
          { word: "CITY", hint: "Large town" },
          { word: "COUNTRY", hint: "A nation" },
          { word: "FLAG", hint: "National symbol" },
          { word: "CULTURE", hint: "Way of life" }
        ],
        '3': [
          { word: "GOVERNMENT", hint: "Ruling system" },
          { word: "DEMOCRACY", hint: "People's rule" },
          { word: "HISTORY", hint: "Past events" },
          { word: "TRADITION", hint: "Customs passed down" }
        ],
        '4': [
          { word: "CIVILIZATION", hint: "Advanced society" },
          { word: "REVOLUTION", hint: "Major change" },
          { word: "CONSTITUTION", hint: "Basic laws" },
          { word: "CITIZEN", hint: "Member of country" }
        ],
        '5': [
          { word: "GEOGRAPHY", hint: "Study of Earth" },
          { word: "ECONOMICS", hint: "Study of money" },
          { word: "SOCIOLOGY", hint: "Study of society" },
          { word: "ANTHROPOLOGY", hint: "Study of humans" }
        ],
        '6': [
          { word: "PHILOSOPHY", hint: "Study of ideas" },
          { word: "POLITICS", hint: "Government affairs" },
          { word: "INTERNATIONAL", hint: "Between countries" },
          { word: "DIPLOMACY", hint: "International relations" }
        ]
      },
      computer: {
        '1': [
          { word: "MOUSE", hint: "Computer pointer" },
          { word: "KEY", hint: "Button to press" },
          { word: "SCREEN", hint: "What you look at" },
          { word: "GAME", hint: "Fun activity" }
        ],
        '2': [
          { word: "KEYBOARD", hint: "Input device" },
          { word: "MONITOR", hint: "Display screen" },
          { word: "CURSOR", hint: "Moving pointer" },
          { word: "CLICK", hint: "Press button" }
        ],
        '3': [
          { word: "PROGRAM", hint: "Set of instructions" },
          { word: "SOFTWARE", hint: "Computer programs" },
          { word: "HARDWARE", hint: "Physical parts" },
          { word: "INTERNET", hint: "World wide web" }
        ],
        '4': [
          { word: "ALGORITHM", hint: "Step by step solution" },
          { word: "DATABASE", hint: "Stores information" },
          { word: "NETWORK", hint: "Connected computers" },
          { word: "SECURITY", hint: "Protection system" }
        ],
        '5': [
          { word: "PROGRAMMING", hint: "Writing code" },
          { word: "JAVASCRIPT", hint: "Programming language" },
          { word: "FUNCTION", hint: "Reusable code block" },
          { word: "VARIABLE", hint: "Stores data" }
        ],
        '6': [
          { word: "ARTIFICIAL", hint: "Made by humans" },
          { word: "INTELLIGENCE", hint: "Smart thinking" },
          { word: "MACHINE", hint: "Mechanical device" },
          { word: "LEARNING", hint: "Gaining knowledge" }
        ]
      },
      gk: {
        '1': [
          { word: "EARTH", hint: "Our planet" },
          { word: "MOON", hint: "Shines at night" },
          { word: "STAR", hint: "Bright in sky" },
          { word: "OCEAN", hint: "Large water body" }
        ],
        '2': [
          { word: "MOUNTAIN", hint: "High land" },
          { word: "RIVER", hint: "Flows through land" },
          { word: "FOREST", hint: "Many trees" },
          { word: "DESERT", hint: "Dry land" }
        ],
        '3': [
          { word: "CONTINENT", hint: "Large land mass" },
          { word: "COUNTRY", hint: "A nation" },
          { word: "CAPITAL", hint: "Main city" },
          { word: "PRESIDENT", hint: "Leader of country" }
        ],
        '4': [
          { word: "GALAXY", hint: "Collection of stars" },
          { word: "VOLCANO", hint: "Mountain that erupts" },
          { word: "EARTHQUAKE", hint: "Ground shaking" },
          { word: "HURRICANE", hint: "Strong storm" }
        ],
        '5': [
          { word: "UNIVERSE", hint: "Everything that exists" },
          { word: "SATELLITE", hint: "Orbiting object" },
          { word: "TELESCOPE", hint: "See far away" },
          { word: "EXPLORATION", hint: "Discovering new places" }
        ],
        '6': [
          { word: "COSMOLOGY", hint: "Study of universe" },
          { word: "ASTROPHYSICS", hint: "Physics of space" },
          { word: "EXTRATERRESTRIAL", hint: "From outer space" },
          { word: "INTERGALACTIC", hint: "Between galaxies" }
        ]
      }
    };

    if (subject) {
      return fallbackWords[subject] || fallbackWords.english;
    }
    return fallbackWords;
  }

  // Get fallback word when no words are available
  getFallbackWord(subject) {
    const fallback = this.getFallbackWords(subject);
    const gradeWords = fallback[this.currentGrade] || fallback['1'] || [];
    const randomIndex = Math.floor(Math.random() * gradeWords.length);
    return gradeWords[randomIndex] || { word: "HANGMAN", hint: "The game you're playing" };
  }

  // Get statistics about available words
  getStats() {
    const stats = {};
    for (const subject in this.words) {
      stats[subject] = {};
      for (const grade in this.words[subject]) {
        stats[subject][grade] = this.words[subject][grade].length;
      }
    }
    return stats;
  }
}

// Create global instance
window.wordManager = new WordManager();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WordManager;
}
