// firebase-leaderboard.js

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXkVBCk49GRiPsXHaYFGUU50VIog-lzEM",
  authDomain: "hangman-game-15b08.firebaseapp.com",
  projectId: "hangman-game-15b08",
  storageBucket: "hangman-game-15b08.appspot.com",
  messagingSenderId: "1000706731271",
  appId: "1:1000706731271:web:e177bc6c0e0d94a50be9a2",
  measurementId: "G-P8271HY3XZ"
};

// Initialize Firebase
let app, db;
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log("✅ Firebase initialized successfully");
} catch (error) {
  console.error("❌ Firebase initialization failed:", error);
}

// Add score to leaderboard
export async function addScore(playerName, score){
  try {
    console.log("Attempting to add score:", { playerName, score });
    const docRef = await addDoc(collection(db, "hangman_scores"), {
      name: playerName,
      score: score,
      timestamp: Date.now()
    });
    console.log("Score added successfully with ID:", docRef.id);
    return true;
  } catch (e) {
    console.error("Error adding score:", e);
    console.error("Error details:", {
      code: e.code,
      message: e.message,
      stack: e.stack
    });
    return false;
  }
}

// Get top scores
export async function getTopScores(limitCount = 5){
  try {
    console.log("Attempting to fetch leaderboard...");
    const q = query(collection(db, "hangman_scores"), orderBy("score", "desc"), limit(limitCount));
    const querySnapshot = await getDocs(q);
    const scores = [];
    querySnapshot.forEach((doc) => {
      console.log("Found score:", doc.data());
      scores.push(doc.data());
    });
    console.log("Successfully fetched", scores.length, "scores");
    return scores;
  } catch (e) {
    console.error("Error getting scores:", e);
    console.error("Error details:", {
      code: e.code,
      message: e.message,
      stack: e.stack
    });
    return [];
  }
}
