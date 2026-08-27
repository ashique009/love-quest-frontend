# Love Quest — Custom Interactive Surprise Website ❤️

A custom-built, mobile-first, romantic digital story experience crafted specifically for your partner. Built with modern HTML5, CSS3 glassmorphism design system, interactive HTML5 canvas particle engines, hacker terminal Easter eggs, and a customizable configuration architecture.

---

## 📁 File Structure

```
love-quest/
│
├── index.html           # Main HTML structure with level containers & canvas layers
├── css/
│   └── style.css        # Complete design system, glassmorphism, mobile responsiveness & keyframes
├── js/
│   ├── config.js        # Central configuration file (questions, answers, messages, audio, colors)
│   └── app.js           # Application state machine, canvas engines, typewriter effects & API tracking
├── assets/
│   ├── images/          # Image assets folder
│   └── music/           # Audio assets folder (place your MP3 file here)
└── README.md            # Detailed customization and deployment guide
```

---

## ⚙️ Customization Guide (`js/config.js`)

All story content, quiz questions, answers, emotional text, final surprise message, theme colors, and background music are configured from a single file: `js/config.js`.

### 1. How to Change Her Name
Open `js/config.js` and edit the `girlfriendName` property:
```javascript
const CONFIG = {
    girlfriendName: "Ammu", // Change to her real name or nickname
};
```

---

### 2. How to Change the Level 1 Nickname Question
Edit `CONFIG.nicknameQuestion`:
```javascript
nicknameQuestion: {
    question: "Ninne njan entha vilikkendath? 👀",
    options: [
        "Ammu ❤️",
        "Kutta 🥰",
        "Mine Forever 🔐",
        "Penne ✨"
    ],
    correctAnswer: 0, // 0-based index (0 = first option, 1 = second option, etc.)
    correctMessage: "Okayyy... you know me better than I expected 😌❤️",
    wrongMessage: "Really? 😂 Try again..."
}
```

---

### 3. How to Change Quiz Questions & Answers (Level 3)
Edit the `CONFIG.quiz` array. Each object represents one question:
```javascript
quiz: [
    {
        id: "q1",
        question: "What is our absolute favorite late-night conversation topic?",
        options: [
            "Future travel plans & dream dates ✈️",
            "Deep 2 AM life philosophies 🌌",
            "Funny inside jokes & roasts 😂",
            "All of the above ❤️"
        ],
        correctAnswer: 3, // Index of the correct answer (0, 1, 2, or 3)
        correctMessage: "Spot on! Every conversation with you is special. 🥰",
        wrongMessage: "Hmm, almost! But think about EVERYTHING we talk about... 😉"
    }
]
```

---

### 4. How to Add New Questions
Simply add a new object to the `CONFIG.quiz` array:
```javascript
quiz: [
    // existing questions...
    {
        id: "q4",
        question: "What's our favorite food to order together?",
        options: ["Shawarma 🌯", "Pizza 🍕", "Biryani 🍲", "Ice Cream 🍦"],
        correctAnswer: 2,
        correctMessage: "You know me so well! 🤤",
        wrongMessage: "Nope! Think richer... 🍲"
    }
]
```

---

### 5. How to Change the Final Surprise Message (Level 6)
Edit `CONFIG.finalMessage`. Supports multi-line formatting with line breaks:
```javascript
finalMessage: `Dear My Love,

Distance might keep us in different cities for now...

Thank you for being my favorite person.

With all my love,
Always ❤️`,
```

---

### 6. How to Add Background Music
1. Save your MP3 track inside `assets/music/` (e.g., `assets/music/romantic_theme.mp3`).
2. Update `musicUrl` in `js/config.js`:
```javascript
musicUrl: "assets/music/romantic_theme.mp3",
```
*Note: Due to browser autoplay policies, music playback is triggered when the user clicks the "🎵 Play Music" button or the final celebration button.*

---

### 7. How to Change Colors & Particle Density
Modify `CONFIG.theme` in `js/config.js`:
```javascript
theme: {
    accentRose: "#ff4d6d",
    accentPink: "#ff8fa3",
    bgDark: "#08040d",
    particleDensity: 35, // Adjust floating heart count (lower for older phones)
    typewriterSpeedMs: 35 // Speed of final message typewriter (ms per char)
}
```

---

## 🐍 Future Django REST API Integration

The website automatically logs user interactions and quiz answers to memory and `localStorage` under the key `love_quest_answers`.

When you are ready to connect a Django backend, locate `recordAnswer` inside `js/app.js`:

### Expected Backend Endpoint
- **URL**: `POST /api/surprise/answers/`
- **Payload Format**:
```json
{
    "session_id": "session_a8f9x2k1_1724650000000",
    "level": 1,
    "question": "Ninne njan entha vilikkendath?",
    "answer": "Ammu ❤️",
    "is_correct": true,
    "timestamp": "2026-08-26T10:30:00.000Z"
}
```

### Un-commenting Django API Call in `js/app.js`:
```javascript
async function recordAnswer(level, questionId, selectedAnswer, isCorrect) {
    const payload = {
        session_id: sessionId,
        level: level,
        question: questionId,
        answer: selectedAnswer,
        is_correct: isCorrect,
        timestamp: new Date().toISOString()
    };

    // Store locally
    const stored = JSON.parse(localStorage.getItem('love_quest_answers') || '[]');
    stored.push(payload);
    localStorage.setItem('love_quest_answers', JSON.stringify(stored));

    // Send to Django REST API
    try {
        await fetch('/api/surprise/answers/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    } catch (err) {
        console.warn('API sync failed:', err);
    }
}
```

---

## 🚀 Running the Website Locally

You don't need any complex build tools or compilers.

### Option 1: Direct File Opening
Double-click `index.html` to open directly in Chrome, Safari, Firefox, or Edge.

### Option 2: Local HTTP Server (Recommended for testing audio & canvas)
Using Python:
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

Using Node `npx`:
```bash
npx serve .
```

---

## 🌐 Deploying the Website Online

Since this is a lightweight static HTML/CSS/JS application, you can host it for free in under 2 minutes:

### 1. GitHub Pages (Free & Easy)
1. Push this folder to a GitHub repository.
2. In GitHub, go to **Settings** → **Pages**.
3. Select `main` branch as the source and click **Save**.
4. Send her the generated link!

### 2. Vercel or Netlify
1. Drag and drop the `love-quest` folder into Vercel or Netlify.
2. Deploy instantly and get a custom domain/URL.

---

## 🔒 License & Copyright
Made with ❤️ by a software developer for the most special person.
