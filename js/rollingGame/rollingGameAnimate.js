import { setupLevel2 } from './rollingGameLevels.js';
import { checkCollision } from './rollingGameCheckCollision.js';
import { endGame } from './rollingGameEndGame.js';
import { updateScoreDisplay, showFinalScore } from './rollingGameScore.js';

export function animate(pouSphere, camera, controls, renderer, scene, obstacles, boundaries, movement, speed, autoMoveSpeed, gameScore, gameState, sunLight) {
    if (gameState.isGameOver) return;

    requestAnimationFrame(() => animate(pouSphere, camera, controls, renderer, scene, obstacles, boundaries, movement, speed, autoMoveSpeed, gameScore, gameState, sunLight));

    // Switch to Level 2 based on the score
    if (gameScore.value >= 200 && gameState.currentLevel === 1) {
        gameState.currentLevel = 2;
        console.log("Switching to Level 2!");

        pouSphere.position.set(0, 1.5, 145);
        pouSphere.rotation.set(0, 0, 0);

        // Set obstacles for the new level
        setupLevel2(scene, obstacles);

        autoMoveSpeed = 0.30;
    }

    // Victory condition: stop the game at Level 2 and score 500
    if (gameScore.value >= 500 && gameState.currentLevel === 2) {
        console.log("Victory!");
        showVictoryMessage(); // Display the victory message
        endGame(gameState); // Stop the game
        return;
    }

    // Move Pou
    pouSphere.position.z -= autoMoveSpeed;
    pouSphere.rotation.x -= autoMoveSpeed;

    if (movement.a && !isCollidingWithBoundary(pouSphere, boundaries[0])) {
        pouSphere.position.x -= speed;
    }
    if (movement.d && !isCollidingWithBoundary(pouSphere, boundaries[1])) {
        pouSphere.position.x += speed;
    }

    // Adjust camera position relative to Pou
    const cameraOffset = new THREE.Vector3(0, 10, 15);
    camera.position.copy(pouSphere.position.clone().add(cameraOffset));
    camera.lookAt(pouSphere.position);
    controls.target.copy(pouSphere.position);
    controls.update();

    const lightOffset = new THREE.Vector3(10, 20, 10);
    sunLight.position.copy(pouSphere.position.clone().add(lightOffset));
    sunLight.target.position.copy(pouSphere.position);
    sunLight.target.updateMatrixWorld();

    // Collision detection
    for (const obstacle of obstacles) {
        if (checkCollision(pouSphere, obstacle)) {
            console.log(`Collision with obstacle at position: x=${obstacle.position.x}, y=${obstacle.position.y}, z=${obstacle.position.z}`);
            endGame(gameState);
            showFinalScore();
            return;
        }
    }

    if (Math.floor(gameScore.value / 10) > Math.floor((gameScore.value - autoMoveSpeed) / 10)) {
        autoMoveSpeed += 0.005;
        console.log(`Speed up! Current speed: ${autoMoveSpeed.toFixed(2)}`);
    }

    gameScore.value += autoMoveSpeed;
    updateScoreDisplay();

    renderer.render(scene, camera);
}

function isCollidingWithBoundary(object, boundary) {
    const objectBox = new THREE.Box3().setFromObject(object);
    const boundaryBox = new THREE.Box3().setFromObject(boundary);
    return objectBox.intersectsBox(boundaryBox);
}

function showVictoryMessage() {
    const victoryDiv = document.createElement('div');
    victoryDiv.style.position = 'absolute';
    victoryDiv.style.top = '50%';
    victoryDiv.style.left = '50%';
    victoryDiv.style.transform = 'translate(-50%, -50%)';
    victoryDiv.style.fontSize = '36px';
    victoryDiv.style.color = 'green';
    victoryDiv.style.fontWeight = 'bold';
    victoryDiv.style.zIndex = '1000';
    victoryDiv.textContent = 'Victory!';
    document.body.appendChild(victoryDiv);
}
