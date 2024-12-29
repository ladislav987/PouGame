// rollingGameAnimate.js
import { setupLevel2 } from './rollingGameLevels.js';
import { checkCollision } from './rollingGameCheckCollision.js';
import { endGame } from './rollingGameEndGame.js';
import { updateScoreDisplay, showFinalScore } from './rollingGameScore.js';

export function animate(pouSphere, camera, controls, renderer, scene, obstacles, boundaries, movement, speed, autoMoveSpeed, gameScore, gameState, sunLight) {
    if (gameState.isGameOver) return;

    requestAnimationFrame(() => animate(pouSphere, camera, controls, renderer, scene, obstacles, boundaries, movement, speed, autoMoveSpeed, gameScore, gameState, sunLight));

    // Switch to Level 2 based on the score
    if (gameScore.value >= 200 && gameState.currentLevel === 1) {
        gameState.currentLevel = 2; // Set the new level
        console.log("Switching to Level 2!");

        // Reset Pou's position
        pouSphere.position.set(0, 1.5, 145); // Initial position of Pou
        pouSphere.rotation.set(0, 0, 0); // Reset rotation

        // Set obstacles for the new level
        setupLevel2(scene, obstacles);

        // Reset speed if needed
        autoMoveSpeed = 0.05;
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

    // Adjust DirectionalLight position relative to Pou
    const lightOffset = new THREE.Vector3(10, 20, 10); // Relative position of the light
    sunLight.position.copy(pouSphere.position.clone().add(lightOffset));
    sunLight.target.position.copy(pouSphere.position); // Light focuses on Pou
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

    // Increase speed based on score milestones
    if (Math.floor(gameScore.value / 100) > Math.floor((gameScore.value - autoMoveSpeed) / 100)) {
        autoMoveSpeed += 0.01;
        console.log(`Speed up! Current speed: ${autoMoveSpeed.toFixed(2)}`);
    }

    // Update score and display
    gameScore.value += autoMoveSpeed;
    updateScoreDisplay();

    renderer.render(scene, camera);
}

function isCollidingWithBoundary(object, boundary) {
    const objectBox = new THREE.Box3().setFromObject(object);
    const boundaryBox = new THREE.Box3().setFromObject(boundary);
    return objectBox.intersectsBox(boundaryBox);
}