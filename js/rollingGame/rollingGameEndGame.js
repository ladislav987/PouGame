// rollingGameEndGame.js

import { gameState } from './gameState.js';

/**
 * Ends the game by setting the game state to "game over".
 * Optional: Add a game over message to the screen (commented out for now).
 */
export function endGame() {
    gameState.isGameOver = true;

    // Uncomment the code below to display a "Game Over" message on the screen
    /*
    const gameOverText = document.createElement('div');
    gameOverText.style.position = 'absolute';
    gameOverText.style.top = '50%';
    gameOverText.style.left = '50%';
    gameOverText.style.transform = 'translate(-50%, -50%)';
    gameOverText.style.color = 'red';
    gameOverText.style.fontSize = '48px';
    gameOverText.style.fontWeight = 'bold';
    gameOverText.style.textAlign = 'center';
    gameOverText.textContent = 'Game Over!';
    document.body.appendChild(gameOverText);
    */
}
