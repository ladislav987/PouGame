import { gameState } from './gameState.js';

export function endGame() {
    gameState.isGameOver = true;
    const gameOverText = document.createElement('div');
    gameOverText.style.position = 'absolute';
    gameOverText.style.top = '50%';
    gameOverText.style.left = '50%';
    gameOverText.style.transform = 'translate(-50%, -50%)';
    gameOverText.style.color = 'red';
    gameOverText.style.fontSize = '48px';
    gameOverText.style.fontWeight = 'bold';
    gameOverText.style.textAlign = 'center';
    gameOverText.textContent = 'Koniec hry!';
    document.body.appendChild(gameOverText);
}
