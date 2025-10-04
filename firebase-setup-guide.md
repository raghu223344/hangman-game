# 🔥 Firebase Setup Guide for Hangman Game

## Step 1: Update Firebase Security Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `hangman-game-15b08`
3. Go to **Firestore Database** → **Rules**
4. Replace the existing rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read/write access to hangman_scores collection
    match /hangman_scores/{document} {
      allow read, write: if true;
    }
    
    // Allow public read/write access to leaderboard collection (alternative)
    match /leaderboard/{document} {
      allow read, write: if true;
    }
  }
}
```

5. Click **"Publish"**

## Step 2: Verify Firebase Project Status

1. In Firebase Console, go to **Project Settings** → **General**
2. Make sure your project is **Active** (not in trial mode)
3. Check that **Firestore Database** is enabled
4. Verify your API key is correct

## Step 3: Test Connection

1. Open `test-firebase.html` in your browser
2. Click "Test Firebase Connection"
3. If successful, you should see "✅ Firebase connection successful!"

## Step 4: Play the Game

1. Open `game.html` in your browser
2. Play and win a game
3. Enter your name when prompted
4. Check if your score appears in the leaderboard

## Troubleshooting

### If you see "Permission denied" errors:
- Check that security rules are published correctly
- Verify the collection name matches exactly: `hangman_scores`

### If you see "Network error" or "Failed to fetch":
- Check your internet connection
- Verify Firebase project is active
- Try refreshing the page

### If scores don't appear:
- Check browser console (F12) for error messages
- Verify the score was actually added to Firestore
- Check if the query is ordering by the correct field




