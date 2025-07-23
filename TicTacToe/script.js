// DOM Elements
const screens = {
    home: document.getElementById('home-screen'),
    singleSetup: document.getElementById('single-setup'),
    multiSetup: document.getElementById('multi-setup'),
    game: document.getElementById('game-screen')
};
const boardElem = document.getElementById('board');
const gameMessage = document.getElementById('game-message');
const playAgainBtn = document.getElementById('play-again-btn');
const backHomeBtns = [
    document.getElementById('back-home-1'),
    document.getElementById('back-home-2'),
    document.getElementById('back-home-3')
];
const singlePlayerBtn = document.getElementById('single-player-btn');
const multiPlayerBtn = document.getElementById('multi-player-btn');
const startSingleBtn = document.getElementById('start-single-btn');
const startMultiBtn = document.getElementById('start-multi-btn');
const singlePlayerNameInput = document.getElementById('single-player-name');
const player1NameInput = document.getElementById('player1-name');
const player2NameInput = document.getElementById('player2-name');
const aiDifficultySelect = document.getElementById('ai-difficulty');
const gameModeTitle = document.getElementById('game-mode-title');
const playerXLabel = document.getElementById('player-x-label');
const playerOLabel = document.getElementById('player-o-label');
const xWinsElem = document.getElementById('x-wins');
const oWinsElem = document.getElementById('o-wins');

// Game State
let gameMode = null; // 'single' or 'multi'
let aiDifficulty = 'easy';
let playerNames = { x: 'Player 1', o: 'Player 2' };
let scores = { x: 0, o: 0 };
let board = Array(9).fill(null);
let currentPlayer = 'x';
let gameActive = false;
let aiTurn = false;

// Utility
function showScreen(screen) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[screen].classList.add('active');
}

function resetBoard() {
    board = Array(9).fill(null);
    currentPlayer = 'x';
    gameActive = true;
    aiTurn = false;
    renderBoard();
    gameMessage.textContent = '';
}

function renderBoard(winLine = null) {
    boardElem.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        if (board[i]) cell.classList.add(board[i]);
        if (winLine && winLine.includes(i)) cell.classList.add('win');
        cell.dataset.index = i;
        cell.addEventListener('click', onCellClick, { once: true });
        cell.textContent = board[i] ? (board[i] === 'x' ? '❌' : '⭕') : '';
        if (board[i]) {
            cell.classList.add('pop');
            setTimeout(() => cell.classList.remove('pop'), 200);
        }
        boardElem.appendChild(cell);
    }
    highlightCurrentPlayer();
}

function updateScoreboard() {
    xWinsElem.textContent = `${playerNames.x} Wins: ${scores.x}`;
    oWinsElem.textContent = `${playerNames.o} Wins: ${scores.o}`;
    playerXLabel.textContent = `${playerNames.x} (X)`;
    playerOLabel.textContent = `${playerNames.o} (O)`;
}

function onCellClick(e) {
    if (!gameActive) return;
    const idx = +e.target.dataset.index;
    if (board[idx]) return;
    board[idx] = currentPlayer;
    moveSound.play();
    renderBoard();
    const winLine = checkWin(board, currentPlayer);
    if (winLine) {
        endGame(`${playerNames[currentPlayer]} wins!`, winLine);
        scores[currentPlayer]++;
        updateScoreboard();
        return;
    }
    if (board.every(cell => cell)) {
        endGame("It's a draw!");
        return;
    }
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    if (gameMode === 'single' && currentPlayer === 'o') {
        aiTurn = true;
        gameMessage.textContent = "AI's turn";
        highlightCurrentPlayer();
        setTimeout(aiMove, 900); // Increased delay for better visibility
    } else {
        aiTurn = false;
        if (gameMode === 'single') {
            gameMessage.textContent = "Player's turn";
        } else {
            gameMessage.textContent = `Player ${currentPlayer === 'x' ? '1' : '2'}'s turn`;
        }
        highlightCurrentPlayer();
    }
}

function endGame(message, winLine = null) {
    gameActive = false;
    let emoji = '';
    if (message.includes('wins')) emoji = '🎉';
    else if (message.includes('draw')) emoji = '😮';
    gameMessage.textContent = `${message} ${emoji}`;
    if (winLine) {
        renderBoard(winLine);
        winSound.play();
        confettiBurst();
    } else if (message.includes('draw')) {
        drawSound.play();
    }
}

/**
 * Checks if the given player has won, or if the game is a draw.
 * @param {Array} b - The board array (length 9).
 * @param {string} player - 'x' or 'o'.
 * @returns {Array|null} - Returns the winning line (array of indices) if win, or null.
 */
function checkWin(b, player) {
    const lines = [
        [0,1,2],[3,4,5],[6,7,8], // rows
        [0,3,6],[1,4,7],[2,5,8], // columns
        [0,4,8],[2,4,6]          // diagonals
    ];
    for (const line of lines) {
        if (line.every(i => b[i] === player)) return line;
    }
    return null;
}

/**
 * Checks if the board is full (draw).
 * @param {Array} b - The board array.
 * @returns {boolean}
 */
function isDraw(b) {
    return b.every(cell => cell);
}

// AI Logic
function aiMove() {
    if (!gameActive) return;
    let move;
    if (aiDifficulty === 'easy') {
        move = randomMove();
    } else if (aiDifficulty === 'medium') {
        move = mediumAIMove();
    } else {
        move = minimaxMove();
    }
    board[move] = 'o';
    moveSound.play();
    renderBoard();
    const winLine = checkWin(board, 'o');
    if (winLine) {
        endGame(`${playerNames.o} wins!`, winLine);
        scores.o++;
        updateScoreboard();
        return;
    }
    if (board.every(cell => cell)) {
        endGame("It's a draw!");
        return;
    }
    currentPlayer = 'x';
    aiTurn = false;
    gameMessage.textContent = `${playerNames.x}'s turn`;
    highlightCurrentPlayer();
}

function randomMove() {
    const empty = board.map((v, i) => v ? null : i).filter(v => v !== null);
    return empty[Math.floor(Math.random() * empty.length)];
}

function mediumAIMove() {
    // Try to win
    for (let i = 0; i < 9; i++) {
        if (!board[i]) {
            board[i] = 'o';
            if (checkWin(board, 'o')) {
                board[i] = null;
                return i;
            }
            board[i] = null;
        }
    }
    // Block X
    for (let i = 0; i < 9; i++) {
        if (!board[i]) {
            board[i] = 'x';
            if (checkWin(board, 'x')) {
                board[i] = null;
                return i;
            }
            board[i] = null;
        }
    }
    // Otherwise random
    return randomMove();
}

function minimaxMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
        if (!board[i]) {
            board[i] = 'o';
            let score = minimax(board, 0, false);
            board[i] = null;
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function minimax(b, depth, isMax) {
    const winO = checkWin(b, 'o');
    const winX = checkWin(b, 'x');
    if (winO) return 10 - depth;
    if (winX) return depth - 10;
    if (b.every(cell => cell)) return 0;
    if (isMax) {
        let best = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (!b[i]) {
                b[i] = 'o';
                best = Math.max(best, minimax(b, depth + 1, false));
                b[i] = null;
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < 9; i++) {
            if (!b[i]) {
                b[i] = 'x';
                best = Math.min(best, minimax(b, depth + 1, true));
                b[i] = null;
            }
        }
        return best;
    }
}

// --- Sound Effects (optional, comment out if not wanted) ---
const moveSound = new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa4b6b.mp3');
const winSound = new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa4b6b.mp3');
const drawSound = new Audio('https://cdn.pixabay.com/audio/2022/07/26/audio_124bfa4b6b.mp3');

// --- Confetti ---
function confettiBurst() {
    for (let i = 0; i < 30; i++) {
        const conf = document.createElement('div');
        conf.className = 'confetti';
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.background = `hsl(${Math.random()*360},90%,60%)`;
        conf.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
        document.body.appendChild(conf);
        setTimeout(() => conf.remove(), 2000);
    }
}

// Sparkle generator for background fun
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    sparkle.style.animationDuration = (2 + Math.random() * 2) + 's';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 4000);
}
setInterval(createSparkle, 500);

// --- Highlight current player ---
function highlightCurrentPlayer() {
    playerXLabel.style.textShadow = currentPlayer === 'x' ? '0 0 10px #ffe066, 0 2px 0 #222' : '';
    playerOLabel.style.textShadow = currentPlayer === 'o' ? '0 0 10px #00e0ff, 0 2px 0 #222' : '';
}

// Navigation & Event Listeners
singlePlayerBtn.onclick = () => {
    showScreen('singleSetup');
};
multiPlayerBtn.onclick = () => {
    showScreen('multiSetup');
};
backHomeBtns.forEach(btn => btn.onclick = () => {
    showScreen('home');
});
startSingleBtn.onclick = () => {
    const name = singlePlayerNameInput.value.trim() || 'Player';
    playerNames = { x: name, o: 'AI' };
    aiDifficulty = aiDifficultySelect.value;
    scores = { x: 0, o: 0 };
    updateScoreboard();
    gameModeTitle.textContent = 'Player vs AI';
    showScreen('game');
    resetBoard();
    gameMessage.textContent = `${playerNames.x}'s turn`;
    gameMode = 'single';
};
startMultiBtn.onclick = () => {
    const name1 = player1NameInput.value.trim() || 'Player 1';
    const name2 = player2NameInput.value.trim() || 'Player 2';
    playerNames = { x: name1, o: name2 };
    scores = { x: 0, o: 0 };
    updateScoreboard();
    gameModeTitle.textContent = 'Multiplayer Game';
    showScreen('game');
    resetBoard();
    gameMessage.textContent = `${playerNames.x}'s turn`;
    gameMode = 'multi';
};
playAgainBtn.onclick = () => {
    resetBoard();
    gameMessage.textContent = `${playerNames[currentPlayer]}'s turn`;
};

// Initial screen
showScreen('home');