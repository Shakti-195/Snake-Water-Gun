

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

## 🙌 Author

**Shakti Singh**  
A passionate builder of smart, interactive tech experiences.

---

If you'd like, I can help you write a CONTRIBUTING guide or prep it for GitHub Pages or deployment. Just say the word!
