export const gameScore = {
    value: 0, // Počiatočné skóre
};

// Funkcia na aktualizáciu skóre na obrazovke
export function updateScoreDisplay() {
    let scoreElement = document.getElementById('score-display');
    if (!scoreElement) {
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
    scoreElement.textContent = `Skóre: ${Math.floor(gameScore.value)}`;
}

// Funkcia na zobrazenie konečného skóre po skončení hry
export function showFinalScore() {
    const finalScoreElement = document.createElement('div');
    finalScoreElement.style.position = 'absolute';
    finalScoreElement.style.top = '60%';
    finalScoreElement.style.left = '50%';
    finalScoreElement.style.transform = 'translate(-50%, -50%)';
    finalScoreElement.style.color = 'white';
    finalScoreElement.style.fontSize = '32px';
    finalScoreElement.style.fontWeight = 'bold';
    finalScoreElement.style.textAlign = 'center';
    finalScoreElement.textContent = `Koniec hry! Vaše skóre: ${Math.floor(gameScore.value)}`;
    document.body.appendChild(finalScoreElement);
}
