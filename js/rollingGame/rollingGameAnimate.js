import { checkCollision } from './rollingGameCheckCollision.js';
import { endGame } from './rollingGameEndGame.js';
import { updateScoreDisplay, showFinalScore } from './rollingGameScore.js';

export function animate(pouSphere, camera, controls, renderer, scene, obstacles, boundaries, movement, speed, autoMoveSpeed, gameScore, gameState) {
    if (gameState.isGameOver) return;

    requestAnimationFrame(() => animate(pouSphere, camera, controls, renderer, scene, obstacles, boundaries, movement, speed, autoMoveSpeed, gameScore, gameState));

    pouSphere.position.z -= autoMoveSpeed;
    pouSphere.rotation.x -= autoMoveSpeed;

    if (movement.a && !isCollidingWithBoundary(pouSphere, boundaries[0])) {
        pouSphere.position.x -= speed;
    }
    if (movement.d && !isCollidingWithBoundary(pouSphere, boundaries[1])) {
        pouSphere.position.x += speed;
    }

    const cameraOffset = new THREE.Vector3(0, 10, 15);
    camera.position.copy(pouSphere.position.clone().add(cameraOffset));
    camera.lookAt(pouSphere.position);
    controls.target.copy(pouSphere.position);
    controls.update();

    for (const obstacle of obstacles) {
        if (checkCollision(pouSphere, obstacle)) {
            console.log(`Kolízia s prekážkou na pozícii: x=${obstacle.position.x}, y=${obstacle.position.y}, z=${obstacle.position.z}`);

            // Ukončenie hry a zobrazenie skóre
            endGame(gameState);
            showFinalScore(); // Zobrazenie konečného skóre
            return;
        }
    }

    if (Math.floor(gameScore.value / 100) > Math.floor((gameScore.value - autoMoveSpeed) / 100)) {
        autoMoveSpeed += 0.01;
        console.log(`Zrýchlenie! Aktuálna rýchlosť: ${autoMoveSpeed.toFixed(2)}`);
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
