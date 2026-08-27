/**
 * ============================================================================
 * LOVE QUEST — CENTRAL CONFIGURATION FILE
 * ============================================================================
 *
 * This is the ONLY file you should normally edit.
 *
 * You can customize:
 * - Her name
 * - Questions
 * - Options
 * - Correct answers
 * - Distance section
 * - Terminal messages
 * - Easter egg
 * - Emotional story
 * - Final message
 * - Music
 * - Theme
 *
 * IMPORTANT:
 *
 * correctAnswer: "any"
 * → Every option is treated as a correct answer.
 *
 * correctAnswer: 2
 * → Only the 3rd option is correct because arrays start from 0.
 *
 * Example:
 *
 * options: ["A", "B", "C", "D"]
 * correctAnswer: 2
 *
 * means "C" is the correct answer.
 * ============================================================================
 */


const CONFIG = {

  // ==========================================================================
  // 1. HER NAME
  // ==========================================================================

  girlfriendName: "Rafa",


  // ==========================================================================
  // 2. LEVEL 1 — NICKNAME QUESTION
  // ==========================================================================

  nicknameQuestion: {

    question: "Ninne njan entha vilikkendath? 👀",

    options: [
      "Dafaa ❤️",
      "Paathumma 🥰",
      "Brainlesss 🧠",
      "babee ✨"
    ],

    // Every option is accepted
    correctAnswer: "any",

    correctMessage:
      "Okayyy... whatever you chose, I'm accepting that answer 😌❤️",

    wrongMessage: ""

  },


  // ==========================================================================
  // 3. LEVEL 2 — DISTANCE & CONNECTION
  // ==========================================================================

  distanceText: {

    indiaLabel: "INDIA 🇮🇳",

    dubaiLabel: "DUBAI 🇦🇪",

    line1:
      "Different places.",

    line2:
      "Same little connection. ❤️",

    line3:
      "Maybe distance is just another way of saying... we have somewhere to go together."

  },


  // ==========================================================================
  // 4. LEVEL 3 — MEMORY & CONVERSATION QUIZ
  // ==========================================================================

  quiz: [

    // ------------------------------------------------------------------------
    // QUESTION 1
    // ------------------------------------------------------------------------

    {
      id: "q1",

      question:
        "What did you like about me the most when you first started liking me?",

      options: [
        "The way I talk 🗣️",
        "My sense of humour 😂",
        "My looks 👀",
        "The way I treat you ❤️",
        "Something that you can't explain ✨",
        "Chumma oru try cheythu nokkaam enn karuthi 😂"
      ],

      // Every answer is correct
      correctAnswer: "any",

      correctMessage:
        "Hmm... whatever you chose, I'm taking that as a compliment anyway 😂❤️",

      wrongMessage: ""

    },


    // ------------------------------------------------------------------------
    // QUESTION 2
    // ------------------------------------------------------------------------

    {
      id: "q2",

      question:
        "What do you like the most in a guy? 👀",

      options: [
        "Caring 😍",
        "Understanding  ❤️",
        "Funny 😹",
        "Loyal 🙈",
        "Romantic ✨",
        "Honestly... all of these 😂❤️"
      ],

      correctAnswer: "any",

      correctMessage:
        "Hmm... so you like a guy who has it all? 👀😂❤️",

      wrongMessage: ""

    },


    // ------------------------------------------------------------------------
    // QUESTION 3
    // ------------------------------------------------------------------------

    {
      id: "q3",

      question:
        "Who is officially the most pampered person here? 👑",

      options: [
        "Definitely you 👑",
        "Definitely me 😇",
        "Both of us equally 🤝",
        "It's a tie... but you win ❤️"
      ],

      correctAnswer: "any",

      correctMessage:
        "Correct answer 😌❤️ I knew you'd choose that.",

      wrongMessage: ""

    },


    // ------------------------------------------------------------------------
    // QUESTION 4
    // ------------------------------------------------------------------------

    {
      id: "q4",

      question:
        "If we could spend one random day together, what would you choose?",

      options: [
        "Talk for hours about everything 🗣️💕",
        "Go somewhere random with you 🚗😌",
        "Eat something and share bites 🍕👀",
        "Watch something... or pretend to watch 😏🎬",
        "Do absolutely nothing, just stay close 😂❤️"
      ],

      correctAnswer: "any",

      correctMessage:
        "Hmm... interesting choice 👀 Whatever it is, I’m pretty sure we'd end up having too much fun together 😏❤️",

      wrongMessage: ""

    }

  ],


  // ==========================================================================
  // 5. LEVEL 4 — DEVELOPER / HACKER TERMINAL
  // ==========================================================================

  terminalSequence: [

    "> initializing surprise protocol...",

    "> checking active network nodes...",

    "> node 1 detected: India (IST) 🇮🇳",

    "> node 2 detected: Dubai (GST) 🇦🇪",

    "> calculating geographical separation...",

    "> analyzing conversation frequency...",

    "> analyzing smile signals...",

    "> checking connection stability...",

    "> connection status: ❤️ HIGHLY CONNECTED",

    "> system status: TOO CUTE TO HANDLE",

    "> surprise protocol completed successfully."

  ],


  terminalRevealText:
    "Okayy, ini baaki njan neritt chodhicholam 😂❤️",


  // ==========================================================================
  // 6. HIDDEN EASTER EGG
  // ==========================================================================

  hiddenEasterEgg: {

    title:
      "✨ Secret Developer Note ✨",

    message:
      `You found the secret Easter Egg! 🕵️‍♀️

I wrote lines of code,
debugged animations,
fixed random bugs,
and built this entire little world...

just to put a genuine smile on your face. ❤️`

  },


  // ==========================================================================
  // 7. LEVEL 5 — EMOTIONAL STORY
  // ==========================================================================

  emotionalText: [

    "We don't have hundreds of pictures together.",

    "We don't have years of memories.",

    "We don't even have a perfect date that marks the beginning.",

    "And honestly... that's okay.",

    "Because maybe...",

    "we're still writing our story.",

    "Maybe the best memories are the ones we haven't made yet. ❤️"

  ],


  // ==========================================================================
  // 8. LEVEL 6 — FINAL MESSAGE
  // ==========================================================================

 finalMessage: `Hey you ❤️

I know this isn't some huge love story with years of pictures and memories.

We don't even have a perfect date to say when all of this actually started.

But honestly... I don't think that really matters.

Somehow, talking to you just feels different.
It feels easy, it feels nice... and I just like having you around. ❤️

And even though I'm here in India and you're all the way in Dubai,
I still wanted to make this little thing just for you.

Maybe we don't have a lot of memories yet.
Maybe we're still making them. ❤️

And who knows...
Maybe someday we'll look back at this
and laugh about how all of this started.

Until then...

just stay the same idiot I somehow never get tired of talking to. 😂❤️`,



  // ==========================================================================
  // 9. BACKGROUND MUSIC
  // ==========================================================================

  
  musicUrl: "assets/music/amsham.mp3",



  // ==========================================================================
  // 10. THEME
  // ==========================================================================

  theme: {

    // Main romantic color
    accentRose: "#ff4d6d",

    // Secondary romantic color
    accentPink: "#ff8fa3",

    // Main background
    bgDark: "#08040d",

    // Secondary background
    bgSecondary: "#120812",

    // Card background
    cardBackground: "rgba(255, 255, 255, 0.06)",

    // Border color
    borderColor: "rgba(255, 255, 255, 0.12)",

    // Text
    textPrimary: "#fff5f7",

    // Secondary text
    textSecondary: "#c9aeb5",

    // Number of background particles
    particleDensity: 35,

    // Typewriter speed
    typewriterSpeedMs: 40,

    // Animation intensity
    animationIntensity: "high"

  },


  // ==========================================================================
  // 11. UI TEXT
  // ==========================================================================
  

  ui: {

    introGreeting:
      "Hey you... ❤️",

    introSubtitle:
      "I made something for you.",

    introMessage:
      "Before you continue...",

    introButton:
      "ENTER MY LITTLE WORLD →",


    continueButton:
      "Continue →",


    nextButton:
      "Next →",


    finishButton:
      "Unlock the surprise ❤️",


    playMusic:
      "🎵 Play something?",


    pauseMusic:
      "⏸ Pause music",


    correctLabel:
      "You got it! ❤️",


    wrongLabel:
      "Hmm... try again 👀",


    levelLabel:
      "LEVEL",


    loadingText:
      "Preparing something special...",


    finalAccessText:
      "ACCESS GRANTED ❤️"

  },


  // ==========================================================================
  // 12. PROGRESS
  // ==========================================================================

  progress: {

    show:
      true,

    symbol:
      "♡",

    separator:
      "/"

  },


  // ==========================================================================
  // 13. PARTICLES
  // ==========================================================================

  particles: {

    enabled:
      true,

    hearts:
      true,

    stars:
      true,

    floatingParticles:
      true,

    count:
      35

  },


  // ==========================================================================
  // 14. ANIMATIONS
  // ==========================================================================

  animations: {

    pageTransition:
      true,

    typewriter:
      true,

    floatingHearts:
      true,

    glowEffects:
      true,

    buttonHover:
      true,

    buttonPress:
      true,

    wrongAnswerShake:
      true,

    correctAnswerBurst:
      true,

    finalConfetti:
      true,

    finalHeartExplosion:
      true,

    distanceParticles:
      true,

    terminalTyping:
      true

  },


  // ==========================================================================
  // 15. ANSWER TRACKING
  // ==========================================================================
  //
  // For now this is local.
  //
  // Later we can connect this to your Django REST API.
  // ==========================================================================

  answerTracking: {

    enabled:
      true,

    storageKey:
      "loveQuestAnswers",

    apiEnabled:
      false,

    apiEndpoint:
      "/api/surprise/answers/"

  },


  // ==========================================================================
  // 16. DEVELOPER SETTINGS
  // ==========================================================================

  developer: {

    showConsoleLogs:
      false,

    debugMode:
      false,

    version:
      "1.0.0"

  }

};


// ============================================================================
// FREEZE CONFIGURATION
// ============================================================================
//
// Prevent accidental modification while the app is running.
//
// NOTE:
// Object.freeze only freezes the top-level object.
// That's completely fine for this configuration because we only read values.
// ============================================================================

if (typeof Object.freeze === "function") {
  Object.freeze(CONFIG);
}