# **Story Learn, an AI-Generated Educational Escape Room**

Turn your study material into an interactive **AI-powered escape-room puzzle game**.

---

## 🚀 Overview

**Story Learn** lets students upload notes or choose a topic, then automatically generates escape-room puzzles using an AI model.
The puzzles appear inside a **timed, interactive game** with multiple-choice questions, riddles, and drag-and-drop interactions.

Built for a the CS Girlies 2025 Hackathon.

---

## 🎮 Features

### 🔹 **AI-Generated Puzzles**
- Backend powered by **Flask** + **HuggingFace-routed OpenAI client**
- Generates **3 progressively harder puzzles**
- Each puzzle includes:
  - **question**
  - **answer**
  - **hint**
- Returns **JSON-formatted puzzle objects**

### 🔹 **Interactive Escape-Room Game**
- Countdown timer
- Score system with penalties
- Hints reduce points
- Puzzle types:
  - Multiple choice
  - Text input
  - Drag-and-drop matching

### 🔹 **Polished Game UI**
- Neon cyber-escape aesthetic
- Animated interactions (shake on wrong answer, door unlock animation)
- Dynamic puzzle popups
- Final win/lose screen

---

## 📁 Project Structure
hackathon_csgirlies/
│
├── backend/
│   ├── app.py               # Flask server + AI puzzle generation
│   └── script.js            # Escape room game logic (JS version)
│
└── frontend/
    ├── homepage.html        # Landing page
    ├── Homepage.css         # Landing page styles
    ├── index.html           # Game upload + play screen
    ├── style.css            # Main game UI theme
    └── assets/              # Images (door, backgrounds, etc)


---

## 🧠 How It Works

1. User uploads **PDFs, images, or notes**, or selects a topic
2. Backend sends prompt to AI model on **HuggingFace Router**
3. AI returns **3 puzzles** with:
   - question
   - answer
   - hint
4. Frontend displays puzzles inside an interactive escape room
5. User must solve all puzzles before the timer runs out
6. Final score is based on:
   - correct answers
   - hint usage
   - penalties

---

## 🔧 Tech Stack

### **Frontend**
- HTML, CSS (custom animated theme), JavaScript
- Native DOM drag-and-drop
- UI animations + popups

### **Backend**
- Python + Flask
- HuggingFace-routed OpenAI API
- `.env` file for HF token
- `/generate_puzzles` API endpoint

---

## ▶️ Running the Project

### **1. Clone the Repo**
```bash
git clone https://github.com/alexiacarrenop/hackathon_csgirlies.git
cd hackathon_csgirlies
```
