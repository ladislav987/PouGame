export const gameScore = {
    value: 0, // Initial score
};

/**
 * Updates the score display on the screen.
 * If the score display element doesn't exist, it creates one.
 */
export function updateScoreDisplay() {
    let scoreElement = document.getElementById('score-display');
    if (!scoreElement) {
        // Create the score display element if it doesn't exist
        scoreElement = document.createElement('div');
        scoreElement.id = 'score-display';
        scoreElement.style.position = 'absolute';
        scoreElement.style.top = '30px';
        scoreElement.style.left = '10px';
        scoreElement.style.color = 'white';
        scoreElement.style.fontSize = '24px';
        scoreElement.style.fontWeight = 'bold';
        document.body.appendChild(scoreElement);
    }
    // Update the score text
    scoreElement.textContent = `Score: ${Math.floor(gameScore.value)}`;
}

/**
 * Displays the final score on the screen when the game ends.
 */
export function showFinalScore() {
    const finalScoreElement = document.createElement('div');
    finalScoreElement.style.position = 'absolute';
    finalScoreElement.style.top = '50%';
    finalScoreElement.style.left = '50%';
    finalScoreElement.style.transform = 'translate(-50%, -50%)';
    finalScoreElement.style.color = 'white';
    finalScoreElement.style.fontSize = '32px';
    finalScoreElement.style.fontWeight = 'bold';
    finalScoreElement.style.textAlign = 'center';
    finalScoreElement.textContent = `Game Over! Your Score: ${Math.floor(gameScore.value)}`;
    document.body.appendChild(finalScoreElement);
}