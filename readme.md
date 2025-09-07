

# 🐍 Snake, Gun, Water Game – Full Documentation

## 📌 Overview

This is a web-based implementation of the classic "Snake Water Gun" game, built using **Python**, **Flask**, and **HTML/CSS/JS**. The game features:
- Smart computer logic based on difficulty and history
- Power-ups and extra lives
- Sound effects and animations
- A responsive, interactive UI

---

## 🧠 Game Logic

### Rules:
- 🐍 Snake drinks Water → Snake wins  
- 💧 Water douses Gun → Water wins  
- 🔫 Gun kills Snake → Gun wins  
- Same choices → Draw

### Difficulty Levels:
- **Easy**: Random computer choices  
- **Medium**: Slightly strategic  
- **Hard**: Adaptive AI using player history

---

## 🧩 Project Structure

```
SNAKE,GUN,WATER GAME/
│
├── flash_app.py             # Main Flask app
├── test_app.py              # Unit tests
├── readme.md                # Documentation
├── requirements.txt         # Dependencies
├── .gitignore               # Git exclusions
│
├── gui/
│   ├── __init__.py          # Package initializer
│   ├── logic.py             # Game rules and outcome logic
│   ├── utils.py             # Helper functions
│
│   ├── templates/
│   │   └── index.html       # Main game UI
│
│   └── static/
│       ├── css/
│       │   └── style.css    # Styling
│       ├── js/
│       │   └── script.js    # Game interactivity
│       └── sounds/          # Sound effects
│           ├── click.mp3
│           ├── win.mp3
│           ├── lose.mp3
│           ├── draw.mp3
│           └── background-music.mp3
```

---

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/snake-gun-water-game.git
cd snake-gun-water-game
```

### 2. Create a Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the App
```bash
python flash_app.py
```

Visit `http://localhost:5000` in your browser to play.

---

## 🔁 API Endpoint

### `/play` – POST

**Request JSON:**
```json
{
  "user_choice": 1,
  "difficulty": "hard",
  "history": [0, -1, 1]
}
```

**Response JSON:**
```json
{
  "user_choice": 1,
  "computer_choice": 0,
  "result": "win"
}
```

---

## 🎨 UI Features

- Difficulty selection screen  
- Scoreboard with time and high score  
- Power-up buttons (⚡ Double Points, ❤️ Extra Life)  
- Animated outcome display  
- Pause and game-over overlays  
- Responsive layout and hover effects

---

## 🔊 Sound Integration

- `click.mp3`: Button click  
- `win.mp3`, `lose.mp3`, `draw.mp3`: Game outcomes  
- `background-music.mp3`: Ambient loop

---

## ✅ Testing

Run unit tests using:
```bash
python test_app.py
```

---

## 📜 License

This project is licensed under the **MIT License**. You’re free to use, modify, and distribute it with attribution.

---

🧠 AI-Assisted Development Journey
Built with the support of Gemini
This project was crafted with the help of Gemini, an AI assistant that guided development through prompt-driven collaboration. Below are the top 10 milestones that shaped the game from concept to completion, along with the refined prompts that powered each breakthrough.
🏁 Top 10 Milestones & Prompts
- 🐣 The First Error
Prompt: “Why am I getting the error ‘flask_app.py is not recognized’? How do I run my Python script correctly?”
Milestone: Learned how to execute Python scripts from the terminal using python flask_app.py.
- 🐛 The First Major Bug
Prompt: “I’m getting a ModuleNotFoundError for 'game'. How should I structure my Python project to fix this?”
Milestone: Discovered the importance of Python’s import system and proper project structure.
- 🔗 Making It Interactive
Prompt: “The frontend is displaying, but it’s not functional. How do I connect it to the backend?”
Milestone: Connected the HTML frontend to the Flask backend using JavaScript’s fetch() API.
- 🎨 Improving the UI
Prompt: “The UI doesn’t look good. I want to improve the design and make it visually appealing.”
Milestone: Revamped the interface with modern CSS styling and responsive layout.
- 🧮 Adding Core Gameplay Features
Prompt: “I want the game to display scores and also track high scores across sessions.”
Milestone: Implemented score tracking and persistent high scores using localStorage.
- 🧠 Making the AI Smarter
Prompt: “How can I make the game more engaging and interesting for players?”
Milestone: Introduced adaptive AI with difficulty levels and strategic responses based on player history.
- ⚡ Adding Power-Ups
Prompt: “Can we implement a system where players earn power-ups and extra lives based on their wins?”
Milestone: Developed mechanics for Double Points and Extra Life, rewarding players for performance.
- ⏱️ Adding a Challenge
Prompt: “I want to add a timer for each round to increase the challenge.”
Milestone: Refactored the game loop to include a countdown timer per round.
- 🔊 Adding Full Immersion
Prompt: “I’d like to add sound effects and background music to make the game more immersive and help players focus.”
Milestone: Integrated sound effects and music, enhancing the sensory experience.
- 🚀 Saving Your Work Professionally
Prompt: “I want to learn how to push my project to GitHub using Git.”
Milestone: Mastered Git and GitHub workflows for version control and public sharing.




## 🙌 Author

**Shakti Singh**  
A passionate builder of smart, interactive tech experiences.

---


