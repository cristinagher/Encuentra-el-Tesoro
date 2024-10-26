// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const gridElement = document.getElementById("grid");
const clueElement = document.getElementById("clue");
const attemptsElement = document.getElementById("attempts");
const resetButton = document.getElementById("reset");
const cells = document.querySelectorAll(".cell");

const gridSize = 5;
const maxAttempts = 10;
let attemptsLeft = maxAttempts;
let gameOver = false;

let treasurePosition = {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize)
};

function updateClue(distance) {
    if (distance === 0) {
        clueElement.textContent = "Oleeeeeee lo has encontrado!! 🏆";
    } else if (distance < 2) {
        clueElement.textContent = "¡UY UY UY! 🔥";
    } else if (distance < 3.5) {
        clueElement.textContent = "UY 🌤️";
    } else {
        clueElement.textContent = "Nop, frío frío ❄️";
    }
}

function updateCellColor(cell, distance) {
    cell.classList.remove("hot", "warm", "cold");

    if (distance < 2) {
        cell.classList.add("hot");
    } else if (distance < 3.5) {
        cell.classList.add("warm");
    } else {
        cell.classList.add("cold");
    }
}

function handleCellClick(event) {
    if (gameOver) return;

    event.target.classList.add("clicked");


    const clickedX = Number(event.target.dataset.x);
    const clickedY = Number(event.target.dataset.y);

    const treasureX = treasurePosition.x;
    const treasureY = treasurePosition.y;

    
    let differenceX = clickedX - treasureX;
    let differenceY = clickedY - treasureY;

    
    if (differenceX < 0) {
        differenceX = -differenceX;  
    }
    if (differenceY < 0) {
        differenceY = -differenceY;  
    }

    
    const distance = differenceX + differenceY;

    updateClue(distance);
    updateCellColor(event.target, distance);
    
    
    if (distance === 0) {
        gameOver = true;
        event.target.classList.add("win");
    } else {
        attemptsLeft--;
        attemptsElement.textContent = `Intentos restantes: ${attemptsLeft}`;
        if (attemptsLeft === 0) {
            clueElement.textContent = "Game Over! Se acabaron los intentos 💀";
            gameOver = true;
        }
    }
}

function resetGame() {
    attemptsLeft = maxAttempts;
    gameOver = false;
    clueElement.textContent = "Haz clic en una casilla para comenzar";
    attemptsElement.textContent = `Intentos restantes: ${attemptsLeft}`;
    treasurePosition = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
    };
    cells.forEach(cell => {
        cell.classList.remove("hot", "warm", "cold", "win", "clicked");
        cell.addEventListener("click", handleCellClick);
    });
}

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

resetButton.addEventListener("click", resetGame);