/**
 * ============================================================================
 * LOVE QUEST — CORE APPLICATION ENGINE
 * ============================================================================
 * 
 * Handles level transitions, canvas particle systems, typewriter animations,
 * quiz controller, answer tracking, and interactive audio controls.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // STATE MANAGEMENT
  // ==========================================================================
  let currentLevel = 0;
  let currentQuizIndex = 0;
  let isAudioPlaying = false;
  let distanceCanvasAnimId = null;

  // Generate unique session ID for answer tracking
  const sessionId = getOrCreateSessionId();

  // ==========================================================================
  // DOM ELEMENT REFERENCES
  // ==========================================================================
  const appHeader = document.getElementById('app-header');
  const levelCounterText = document.getElementById('level-counter-text');
  
  // Audio Elements
  const bgAudio = document.getElementById('bg-audio');
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  const audioBtnText = document.getElementById('audio-btn-text');

  // Easter Egg Modal Elements
  const hiddenStarBtn = document.getElementById('hidden-star-btn');
  const easterEggModal = document.getElementById('easter-egg-modal');
  const easterEggTitle = document.getElementById('easter-egg-title');
  const easterEggMessage = document.getElementById('easter-egg-message');
  const closeEasterEggBtn = document.getElementById('close-easter-egg-btn');

  // ==========================================================================
  // ANSWER TRACKING API PLACEHOLDER
  // ==========================================================================
  /**
   * Records user responses to localStorage and provides a clean placeholder
   * for future Django REST API integration.
   * 
   * @param {number} level - The level number
   * @param {string} questionId - Question identifier or prompt
   * @param {string} selectedAnswer - Selected option text
   * @param {boolean} isCorrect - Whether answer was correct
   */
  async function recordAnswer(
  level,
  questionId,
  selectedAnswer,
  isCorrect
) {

  const payload = {
    session_id: sessionId,
    level: level,
    question: questionId,
    answer: selectedAnswer,
    is_correct: isCorrect
  };

  // Save locally too
  try {
    const stored = JSON.parse(
      localStorage.getItem('love_quest_answers') || '[]'
    );

    stored.push(payload);

    localStorage.setItem(
      'love_quest_answers',
      JSON.stringify(stored)
    );

  } catch (error) {
    console.warn(
      'Could not save locally:',
      error
    );
  }


  // Send answer to Django
  try {

    const response = await fetch(
      'https://love-quest-backend.onrender.com/api/answers/',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(payload)
      }
    );


    if (!response.ok) {
      throw new Error(
        `Server error: ${response.status}`
      );
    }


    const data = await response.json();

    console.log(
      '❤️ Answer successfully sent to Django:',
      data
    );

  } catch (error) {

    console.error(
      '❌ Could not send answer to Django:',
      error
    );

  }
}
function getOrCreateSessionId() {
  let sid = localStorage.getItem('love_quest_session_id');

  if (!sid) {
    sid =
      'session_' +
      Math.random().toString(36).substr(2, 9) +
      '_' +
      Date.now();

    localStorage.setItem(
      'love_quest_session_id',
      sid
    );
  }

  return sid;
}

  // ==========================================================================
  // LEVEL NAVIGATION ENGINE
  // ==========================================================================
  function goToLevel(targetLevelNumber) {
    const currentContainer = document.getElementById(`level-${currentLevel}`);
    const nextContainer = document.getElementById(`level-${targetLevelNumber}`);

    if (!nextContainer) return;

    // Fade out current level
    if (currentContainer) {
      currentContainer.classList.remove('active');
      setTimeout(() => {
        currentContainer.style.display = 'none';
      }, 500);
    }

    // Prepare & show target level
    setTimeout(() => {
      currentLevel = targetLevelNumber;
      nextContainer.style.display = 'flex';
      
      // Force reflow for clean transition
      void nextContainer.offsetWidth;
      nextContainer.classList.add('active');

      // Update Header Progress
      if (currentLevel > 0) {
        appHeader.classList.add('visible');
        levelCounterText.textContent = `Level ${currentLevel} / 6`;
      } else {
        appHeader.classList.remove('visible');
      }

      // Trigger level-specific initializers
      initLevelContent(currentLevel);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 550);
  }

  function initLevelContent(level) {
    switch(level) {
      case 1:
        setupLevel1();
        break;
      case 2:
        setupLevel2();
        break;
      case 3:
        setupLevel3();
        break;
      case 4:
        setupLevel4();
        break;
      case 5:
        setupLevel5();
        break;
      case 6:
        setupLevel6();
        break;
    }
  }

  // ==========================================================================
  // BACKGROUND PARTICLES CANVAS ENGINE
  // ==========================================================================
  const bgCanvas = document.getElementById('bg-canvas');
  const bgCtx = bgCanvas.getContext('2d');
  let bgParticles = [];

  function resizeBgCanvas() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeBgCanvas);
  resizeBgCanvas();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * bgCanvas.width;
      this.y = Math.random() * bgCanvas.height + bgCanvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedY = Math.random() * 0.8 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.isHeart = Math.random() > 0.6;
      this.color = Math.random() > 0.5 ? '#ff4d6d' : '#ff8fa3';
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      if (this.y < -20) {
        this.reset();
        this.y = bgCanvas.height + 10;
      }
    }

    draw() {
      bgCtx.save();
      bgCtx.globalAlpha = this.opacity;
      bgCtx.fillStyle = this.color;

      if (this.isHeart) {
        // Draw tiny glowing heart
        bgCtx.font = `${Math.floor(this.size * 3 + 8)}px sans-serif`;
        bgCtx.fillText('♥', this.x, this.y);
      } else {
        // Draw starry glowing dust
        bgCtx.beginPath();
        bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        bgCtx.shadowBlur = 10;
        bgCtx.shadowColor = this.color;
        bgCtx.fill();
      }
      bgCtx.restore();
    }
  }

  function initBgParticles() {
    bgParticles = [];
    const count = CONFIG.theme.particleDensity || 35;
    for (let i = 0; i < count; i++) {
      const p = new Particle();
      p.y = Math.random() * bgCanvas.height; // scatter initially
      bgParticles.push(p);
    }
  }

  function animateBgParticles() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    bgParticles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateBgParticles);
  }

  initBgParticles();
  animateBgParticles();

  // ==========================================================================
  // LEVEL 0 — INTRO LOGIC
  // ==========================================================================
  function setupLevel0() {
    const introTarget = document.getElementById('intro-typewriter-target');
    const startBtn = document.getElementById('start-quest-btn');
    
    introTarget.textContent = '';
    startBtn.style.opacity = '0';
    startBtn.style.pointerEvents = 'none';

    const sequences = [
      `Hey ${CONFIG.girlfriendName}... ❤️`,
      "I made something for you.",
      "Before you continue..."
    ];

    let seqIndex = 0;

    function typeNextSentence() {
      if (seqIndex >= sequences.length) {
        // Fade in button
        startBtn.style.opacity = '1';
        startBtn.style.pointerEvents = 'auto';
        return;
      }

      const text = sequences[seqIndex];
      let charIdx = 0;
      introTarget.textContent = '';

      const timer = setInterval(() => {
        introTarget.textContent += text.charAt(charIdx);
        charIdx++;
        if (charIdx > text.length) {
          clearInterval(timer);
          seqIndex++;
          setTimeout(typeNextSentence, 1400);
        }
      }, 50);
    }

    // Start intro sequence after a brief loader delay
    setTimeout(typeNextSentence, 600);

    startBtn.addEventListener('click', () => {
      goToLevel(1);
    });
  }
  setupLevel0();

  // ==========================================================================
  // LEVEL 1 — NICKNAME QUESTION LOGIC
  // ==========================================================================
  function setupLevel1() {
    const questionText = document.getElementById('level1-question-text');
    const optionsContainer = document.getElementById('level1-options-container');
    const feedbackBox = document.getElementById('level1-feedback');
    const continueBtn = document.getElementById('level1-continue-btn');

    const data = CONFIG.nicknameQuestion;
    questionText.textContent = data.question;
    optionsContainer.innerHTML = '';
    feedbackBox.className = 'feedback-box';
    feedbackBox.textContent = '';
    continueBtn.style.display = 'none';

    data.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `<span>${optText}</span><span class="option-icon"></span>`;
      
      btn.addEventListener('click', () => {
        const isCorrect =
          data.correctAnswer === "any" ||
          idx === data.correctAnswer;
        recordAnswer(
          1,
          data.question,
          optText,
          isCorrect
        );
        // Clear existing states
        Array.from(optionsContainer.children).forEach(c => {
          c.className = 'option-btn';
        });

        if (isCorrect) {
          btn.classList.add('selected-correct');
          feedbackBox.textContent = data.correctMessage;
          feedbackBox.className = 'feedback-box visible correct';
          continueBtn.style.display = 'inline-flex';
        } else {
          btn.classList.add('selected-wrong');
          feedbackBox.textContent = data.wrongMessage;
          feedbackBox.className = 'feedback-box visible wrong';
        }
      });

      optionsContainer.appendChild(btn);
    });

    continueBtn.onclick = () => goToLevel(2);
  }

  // ==========================================================================
  // LEVEL 2 — DISTANCE & CONNECTOR CANVAS ENGINE
  // ==========================================================================
  function setupLevel2() {
    const distTitle = document.getElementById('distance-title');
    const badgeIndia = document.getElementById('badge-india');
    const badgeDubai = document.getElementById('badge-dubai');
    const line1 = document.getElementById('dist-line-1');
    const line2 = document.getElementById('dist-line-2');
    const line3 = document.getElementById('dist-line-3');
    const continueBtn = document.getElementById('level2-continue-btn');

    const dt = CONFIG.distanceText;
    if (distTitle) distTitle.textContent = "Between Us 💫";
    badgeIndia.textContent = dt.indiaLabel || "INDIA 🇮🇳";
    badgeDubai.textContent = dt.dubaiLabel || "DUBAI 🇦🇪";

    line1.textContent = dt.line1;
    line2.textContent = dt.line2;
    line3.textContent = dt.line3;

    line1.classList.remove('visible');
    line2.classList.remove('visible');
    line3.classList.remove('visible');
    continueBtn.style.display = 'none';

    // Staggered text line animations
    setTimeout(() => line1.classList.add('visible'), 400);
    setTimeout(() => line2.classList.add('visible'), 1400);
    setTimeout(() => {
      line3.classList.add('visible');
      continueBtn.style.display = 'inline-flex';
    }, 2400);

    // Canvas Laser Connection Setup
    const dCanvas = document.getElementById('distance-canvas');
    if (!dCanvas) return;
    const dCtx = dCanvas.getContext('2d');

    function resizeDCanvas() {
      const rect = dCanvas.parentElement.getBoundingClientRect();
      dCanvas.width = rect.width;
      dCanvas.height = rect.height;
    }
    resizeDCanvas();

    let pulseProgress = 0;

    function renderDistanceCanvas() {
      dCtx.clearRect(0, 0, dCanvas.width, dCanvas.height);

      const startX = 40;
      const startY = dCanvas.height / 2;
      const endX = dCanvas.width - 40;
      const endY = dCanvas.height / 2;

      const controlX = dCanvas.width / 2;
      const controlY = dCanvas.height / 2 - 35; // curved arc

      // Draw Glowing Connection Bezier Curve
      dCtx.save();
      dCtx.beginPath();
      dCtx.moveTo(startX, startY);
      dCtx.quadraticCurveTo(controlX, controlY, endX, endY);
      dCtx.strokeStyle = 'rgba(255, 77, 109, 0.4)';
      dCtx.lineWidth = 3;
      dCtx.shadowBlur = 12;
      dCtx.shadowColor = '#ff4d6d';
      dCtx.stroke();
      dCtx.restore();

      // Draw Traveling Photons / Hearts along curve
      pulseProgress = (pulseProgress + 0.008) % 1;
      const t = pulseProgress;

      // Quadratic Bezier Formula: (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
      const px = Math.pow(1 - t, 2) * startX + 2 * (1 - t) * t * controlX + Math.pow(t, 2) * endX;
      const py = Math.pow(1 - t, 2) * startY + 2 * (1 - t) * t * controlY + Math.pow(t, 2) * endY;

      // Draw pulse dot
      dCtx.save();
      dCtx.beginPath();
      dCtx.arc(px, py, 6, 0, Math.PI * 2);
      dCtx.fillStyle = '#ffffff';
      dCtx.shadowBlur = 20;
      dCtx.shadowColor = '#ff4d6d';
      dCtx.fill();
      dCtx.restore();

      // Draw Glowing Node Rings on Ends
      [ {x: startX, y: startY}, {x: endX, y: endY} ].forEach(node => {
        dCtx.save();
        dCtx.beginPath();
        dCtx.arc(node.x, node.y, 8, 0, Math.PI * 2);
        dCtx.fillStyle = '#ff4d6d';
        dCtx.shadowBlur = 15;
        dCtx.shadowColor = '#ff4d6d';
        dCtx.fill();
        dCtx.restore();
      });

      distanceCanvasAnimId = requestAnimationFrame(renderDistanceCanvas);
    }

    if (distanceCanvasAnimId) cancelAnimationFrame(distanceCanvasAnimId);
    renderDistanceCanvas();

    continueBtn.onclick = () => goToLevel(3);
  }

  // ==========================================================================
  // LEVEL 3 — CONVERSATION & MEMORY QUIZ CONTROLLER
  // ==========================================================================
  function setupLevel3() {
    currentQuizIndex = 0;
    renderQuizQuestion(currentQuizIndex);
  }

  function renderQuizQuestion(index) {
    const quizList = CONFIG.quiz;
    if (index >= quizList.length) {
      // Completed all quiz questions! Move to Level 4
      goToLevel(4);
      return;
    }

    const qData = quizList[index];
    const progressText = document.getElementById('quiz-progress-text');
    const titleText = document.getElementById('quiz-question-title');
    const optionsContainer = document.getElementById('quiz-options-container');
    const feedbackBox = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('quiz-next-btn');

    progressText.textContent = `♡ Question ${index + 1} of ${quizList.length}`;
    titleText.textContent = qData.question;
    optionsContainer.innerHTML = '';
    feedbackBox.className = 'feedback-box';
    feedbackBox.textContent = '';
    nextBtn.style.display = 'none';

    if (index === quizList.length - 1) {
      nextBtn.textContent = 'Continue to Next Level →';
    } else {
      nextBtn.textContent = 'Next Question →';
    }

    qData.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `<span>${optText}</span>`;

      btn.addEventListener('click', () => {
        const isCorrect =
          qData.correctAnswer === "any" ||
          idx === qData.correctAnswer;
        recordAnswer(
          3,
          qData.question,
          optText,
          isCorrect
        );

        Array.from(optionsContainer.children).forEach(c => {
          c.className = 'option-btn';
        });

        if (isCorrect) {
          btn.classList.add('selected-correct');
          feedbackBox.textContent = qData.correctMessage || "That's right! ❤️";
          feedbackBox.className = 'feedback-box visible correct';
          nextBtn.style.display = 'inline-flex';
        } else {
          btn.classList.add('selected-wrong');
          feedbackBox.textContent = qData.wrongMessage || "Try another option! 😉";
          feedbackBox.className = 'feedback-box visible wrong';
        }
      });

      optionsContainer.appendChild(btn);
    });

    nextBtn.onclick = () => {
      currentQuizIndex++;
      renderQuizQuestion(currentQuizIndex);
    };
  }

  // ==========================================================================
  // LEVEL 4 — HACKER TERMINAL MOMENT LOGIC
  // ==========================================================================
  function setupLevel4() {
    const termBody = document.getElementById('terminal-body');
    const revealText = document.getElementById('terminal-reveal-text');
    const continueBtn = document.getElementById('level4-continue-btn');

    termBody.innerHTML = '';
    revealText.style.display = 'none';
    revealText.textContent = CONFIG.terminalRevealText || "Okay, enough developer nonsense 😂";
    continueBtn.style.display = 'none';

    const lines = CONFIG.terminalSequence || [];
    let lineIdx = 0;

    function typeTerminalLine() {
      if (lineIdx >= lines.length) {
        // Add cursor line & show reveal
        const cursorLine = document.createElement('div');
        cursorLine.className = 'terminal-line';
        cursorLine.innerHTML = `> <span class="terminal-cursor"></span>`;
        termBody.appendChild(cursorLine);

        setTimeout(() => {
          revealText.style.display = 'block';
          continueBtn.style.display = 'inline-flex';
        }, 800);
        return;
      }

      const text = lines[lineIdx];
      const p = document.createElement('div');
      p.className = 'terminal-line';
      if (text.includes('CONNECTED') || text.includes('TOO CUTE')) {
        p.classList.add('connected');
      }
      termBody.appendChild(p);

      let charIdx = 0;
      const interval = setInterval(() => {
        p.textContent = text.substring(0, charIdx);
        charIdx++;
        if (charIdx > text.length) {
          clearInterval(interval);
          lineIdx++;
          setTimeout(typeTerminalLine, 350);
        }
      }, 25);
    }

    setTimeout(typeTerminalLine, 500);

    continueBtn.onclick = () => goToLevel(5);
  }

  // ==========================================================================
  // LEVEL 5 — EMOTIONAL STORY MOMENT LOGIC
  // ==========================================================================
  function setupLevel5() {
    const textBox = document.getElementById('emotional-text-box');
    const continueBtn = document.getElementById('level5-continue-btn');

    textBox.innerHTML = '';
    continueBtn.style.display = 'none';

    const lines = CONFIG.emotionalText || [];

    lines.forEach((lineText, idx) => {
      const p = document.createElement('p');
      p.className = 'emotional-line';
      if (idx === lines.length - 1) {
        p.classList.add('final-highlight');
      }
      p.textContent = lineText;
      textBox.appendChild(p);

      setTimeout(() => {
        p.classList.add('visible');
        if (idx === lines.length - 1) {
          setTimeout(() => {
            continueBtn.style.display = 'inline-flex';
          }, 1000);
        }
      }, (idx + 1) * 1200);
    });

    continueBtn.onclick = () => goToLevel(6);
  }

  // ==========================================================================
  // LEVEL 6 — FINAL SURPRISE & CELEBRATION
  // ==========================================================================
  function setupLevel6() {
    const target = document.getElementById('final-message-target');
    const playAudioBtn = document.getElementById('final-music-play-btn');

    target.textContent = '';
    const fullText = CONFIG.finalMessage || '';
    let charIdx = 0;
    const speed = CONFIG.theme.typewriterSpeedMs || 35;

    function typeFinalLetter() {
      const timer = setInterval(() => {
        target.textContent = fullText.substring(0, charIdx);
        charIdx++;
        if (charIdx > fullText.length) {
          clearInterval(timer);
        }
      }, speed);
    }

    setTimeout(typeFinalLetter, 500);
    triggerCelebrationParticles();

    playAudioBtn.onclick = () => {
      toggleAudioPlay();
    };
  }

  // ==========================================================================
  // CELEBRATION CONFETTI & HEARTS CANVAS ENGINE
  // ==========================================================================
  function triggerCelebrationParticles() {
    const cCanvas = document.getElementById('celebration-canvas');
    if (!cCanvas) return;
    const cCtx = cCanvas.getContext('2d');

    cCanvas.width = window.innerWidth;
    cCanvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#ff4d6d', '#ff8fa3', '#ffb703', '#9d4edd', '#ffffff'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: cCanvas.width / 2,
        y: cCanvas.height / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.7) * 14,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        isHeart: Math.random() > 0.4,
        rotation: Math.random() * Math.PI * 2,
        life: 1
      });
    }

    function animateCelebration() {
      cCtx.clearRect(0, 0, cCanvas.width, cCanvas.height);
      let activeCount = 0;

      particles.forEach(p => {
        if (p.life > 0) {
          activeCount++;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.2; // gravity
          p.life -= 0.008;

          cCtx.save();
          cCtx.globalAlpha = Math.max(0, p.life);
          cCtx.fillStyle = p.color;
          cCtx.translate(p.x, p.y);
          cCtx.rotate(p.rotation);

          if (p.isHeart) {
            cCtx.font = `${Math.floor(p.size * 2 + 10)}px sans-serif`;
            cCtx.fillText('❤️', 0, 0);
          } else {
            cCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          }
          cCtx.restore();
        }
      });

      if (activeCount > 0) {
        requestAnimationFrame(animateCelebration);
      } else {
        cCtx.clearRect(0, 0, cCanvas.width, cCanvas.height);
      }
    }

    animateCelebration();
  }

  // ==========================================================================
  // AUDIO PLAYER CONTROL LOGIC
  // ==========================================================================
  function initAudio() {
    if (CONFIG.musicUrl) {
      bgAudio.src = CONFIG.musicUrl;
    }
  }
  initAudio();

  function toggleAudioPlay() {
    if (!CONFIG.musicUrl) {
      alert("🎵 Audio track URL not set! Add an MP3 file to assets/music/ and update CONFIG.musicUrl in js/config.js");
      return;
    }

    if (isAudioPlaying) {
      bgAudio.pause();
      isAudioPlaying = false;
      audioToggleBtn.classList.remove('playing');
      audioBtnText.textContent = '🎵 Play Music';
    } else {
      bgAudio.play().then(() => {
        isAudioPlaying = true;
        audioToggleBtn.classList.add('playing');
        audioBtnText.textContent = '⏸ Pause Music';
      }).catch(err => {
        console.warn('Audio playback blocked or file missing:', err);
        alert('Could not play audio track. Please verify your file path in js/config.js');
      });
    }
  }

  audioToggleBtn.addEventListener('click', toggleAudioPlay);

  // ==========================================================================
  // HIDDEN EASTER EGG MODAL LISTENERS
  // ==========================================================================
  hiddenStarBtn.addEventListener('click', () => {
    const data = CONFIG.hiddenEasterEgg || {};
    easterEggTitle.textContent = data.title || "✨ Secret Note ✨";
    easterEggMessage.textContent = data.message || "You found the hidden secret!";
    easterEggModal.classList.add('active');
  });

  closeEasterEggBtn.addEventListener('click', () => {
    easterEggModal.classList.remove('active');
  });

  easterEggModal.addEventListener('click', (e) => {
    if (e.target === easterEggModal) {
      easterEggModal.classList.remove('active');
    }
  });

});
