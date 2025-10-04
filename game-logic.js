// Game Logic Functions
// This file contains the main game functionality and moving images

(function() {
  'use strict';

  // Moving Images Functions
  function initializeAnimations() {
    // Cloud animation is handled by CSS
    // Logo pulse animation is handled by CSS
    // Play button pulse animation is handled by CSS
    console.log('Animations initialized');
  }

  // Play Function
  function initializePlayButton() {
    const playBtn = document.getElementById('playBtn');
    const hero = document.getElementById('hero');
    const menuOverlay = document.getElementById('menuOverlay');

    if (!playBtn || !hero || !menuOverlay) {
      console.error('Required elements not found');
      return;
    }

    playBtn.addEventListener('click', () => {
      // Keep intro song playing through subject selection
      hero.classList.add('fade-out');
      setTimeout(() => {
        menuOverlay.style.display = 'flex';
      }, 300);
    });

    // Keyboard accessibility
    playBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        playBtn.click();
      }
    });
  }

  // Menu Overlay Functions
  function initializeMenuOverlay() {
    const startGameBtn = document.getElementById('startGameBtn');
    const gradeSelect = document.getElementById('gradeSelect');
    const subjectSelect = document.getElementById('subjectSelect');

    if (!startGameBtn || !gradeSelect || !subjectSelect) {
      console.error('Menu overlay elements not found');
      return;
    }

    startGameBtn.addEventListener('click', () => {
      const grade = gradeSelect.value;
      const subject = subjectSelect.value;
      
      // Stop intro song when starting game
      const introSong = document.getElementById('introSong');
      if (introSong) {
        introSong.pause();
      }
      
      // Save selections to localStorage to use in game.html
      localStorage.setItem('selectedGrade', grade);
      localStorage.setItem('selectedSubject', subject);
      
      // Redirect to actual game
      window.location.href = 'game.html';
    });
  }

  // Initialize all functions when DOM is loaded
  function initialize() {
    initializeAnimations();
    initializePlayButton();
    initializeMenuOverlay();
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

})();
