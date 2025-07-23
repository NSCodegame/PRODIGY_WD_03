# 🎮 Tic Tac Toe Game

A feature-rich, fully interactive **Tic Tac Toe** web game built with **HTML**, **CSS**, and **JavaScript**.  
It includes **Single Player (AI)** and **Multiplayer** modes with **animated UI**, **confetti effects**, and **sound feedback**.

---

## ✨ Key Features

### 🧑‍🤝‍🧑 Game Modes
- **Single Player Mode**:
  - Play against a smart AI with difficulty levels (**Easy**, **Medium**, **Hard**).
- **Multiplayer Mode**:
  - Two players can play locally on the same device.

### 🧠 AI Logic
- **Easy** – Random moves.
- **Medium** – AI tries to win or block the player.
- **Hard** – **Unbeatable AI using Minimax Algorithm**.

### 🎨 Modern User Interface
- **Animated background** with dynamic floating shapes and sparkles.
- **Highlighting of current player** and interactive cells.
- **Confetti burst** animation when a player wins.
- Smooth transitions and hover effects.

### 🔊 Sound Effects
- Sound for moves, wins, and draws.

### 🏆 Scoreboard
- Real-time tracking of X and O player wins.

### 📱 Responsive Design
- Works flawlessly on **desktop**, **tablet**, and **mobile devices**.

---

## 🖥️ Technical Details

- **Frontend Stack**:
  - HTML5 – Game structure and layout.
  - CSS3 – Vibrant animations, transitions, and responsive design.
  - Vanilla JavaScript – Game logic, AI implementation, and DOM manipulations.

- **AI Algorithm (Minimax)**:
  - Ensures optimal moves by recursively simulating all possible board states.
  - Used when the AI difficulty is set to **Hard**.

- **Animations**:
  - Confetti bursts (`confettiBurst()` function).
  - Floating gradient shapes.
  - Sparkle effects with random placement.

---

## 📂 Project Structure

```

TicTacToe/
│
├── index.html    # HTML layout (screens and game board)
├── style.css     # CSS for animations, styles, and responsiveness
└── script.js     # Core game logic, AI, and event handlers

````

---

## 🚀 Getting Started

### 1. Clone the repository:
```bash
git clone https://github.com/your-username/tic-tac-toe.git
cd tic-tac-toe
````

### 2. Open in Browser:

Open the `index.html` file in your preferred browser.

---

## 🎮 How to Play

1. **Home Screen** – Choose **Single Player** or **Multiplayer**.
2. **Single Player** – Enter your name and select AI difficulty (Easy, Medium, Hard).
3. **Multiplayer** – Enter names for Player 1 (X) and Player 2 (O).
4. **Gameplay** –

   * Players alternate turns by clicking on empty cells.
   * Align 3 of your marks (❌ or ⭕) horizontally, vertically, or diagonally to win.
5. **Scoreboard** – Keeps track of X and O wins.
6. **Play Again** – Click the *Play Again* button to restart the board.

---

## 🖼️ Screenshots

| **Home Screen** | **Game Board** | **Winning Moment** |
| --------------- | -------------- | ------------------ |
| *(Add image)*   | *(Add image)*  | *(Add image)*      |

---

## 🔮 Future Enhancements

* **Online Multiplayer Mode** – Play with friends via WebSockets.
* **Game Replay** – View the match history.
* **Custom Themes** – Add light/dark and custom color themes.
* **Leaderboard** – Persistent scoring with local storage or backend.
* **PWA Support** – Convert the game into a Progressive Web App for offline play.

---

## 🧑‍💻 Customization

* **Change Background Colors**: Update gradient and shape colors in `style.css`.
* **Replace Icons**: Change ❌ and ⭕ to custom images/emojis inside `script.js`.
* **Add New Sounds**: Replace audio URLs in `script.js` (e.g., `moveSound`, `winSound`).

---

## 🧪 Testing

* Test the game on different devices (desktop, tablet, mobile).
* Validate AI performance at all difficulty levels.
* Check animations and sound playback across browsers (Chrome, Firefox, Edge).

---

## 📜 License

This project is released under the **MIT License**.
Feel free to modify, enhance, and share.

---

## 🙌 Acknowledgements

* **Google Fonts** – [Bungee Shade](https://fonts.google.com/specimen/Bungee+Shade).
* **Sound Effects** – [Pixabay Free Sounds](https://pixabay.com/sound-effects/).
* **CSS Animations Inspiration** – Various open-source UI animation examples.

