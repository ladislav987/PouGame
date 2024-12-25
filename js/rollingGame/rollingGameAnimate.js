// rollingGameAnimate.js
import { setupLevel2 } from './rollingGameLevels.js';
import { checkCollision } from './rollingGameCheckCollision.js';
import { endGame } from './rollingGameEndGame.js';
import { updateScoreDisplay, showFinalScore } from './rollingGameScore.js';

export function animate(pouSphere, camera, controls, renderer, scene, obstacles, boundaries, movement, speed, autoMoveSpeed, gameScore, gameState, sunLight) {
    if (gameState.isGameOver) return;

    requestAnimationFrame(() => animate(pouSphere, camera, controls, renderer, scene, obstacles, boundaries, movement, speed, autoMoveSpeed, gameScore, gameState, sunLight));

    // Prepnutie levelu na základe skóre
    if (gameScore.value >= 200 && gameState.currentLevel === 1) {
        gameState.currentLevel = 2; // Nastav nový level
        console.log("Prechod na Level 2!");

        // Resetovanie pozície Poua
        pouSphere.position.set(0, 1.5, 145); // Počiatočná pozícia Poua
        pouSphere.rotation.set(0, 0, 0); // Reset rotácie

        // Nastavenie prekážok pre nový level
        setupLevel2(scene, obstacles);

        // Resetovanie rýchlosti, ak potrebné
        autoMoveSpeed = 0.05;
    }

    // Pohyb Poua
    pouSphere.position.z -= autoMoveSpeed;
    pouSphere.rotation.x -= autoMoveSpeed;

    if (movement.a && !isCollidingWithBoundary(pouSphere, boundaries[0])) {
        pouSphere.position.x -= speed;
    }
    if (movement.d && !isCollidingWithBoundary(pouSphere, boundaries[1])) {
        pouSphere.position.x += speed;
    }

    // Posun kamery podľa Poua
    const cameraOffset = new THREE.Vector3(0, 10, 15);
    camera.position.copy(pouSphere.position.clone().add(cameraOffset));
    camera.lookAt(pouSphere.position);
    controls.target.copy(pouSphere.position);
    controls.update();

    // Posun DirectionalLight podľa Poua
    const lightOffset = new THREE.Vector3(10, 20, 10); // Relatívna pozícia svetla
    sunLight.position.copy(pouSphere.position.clone().add(lightOffset));
    sunLight.target.position.copy(pouSphere.position); // Svetlo sa zameriava na Poua
    sunLight.target.updateMatrixWorld();

    // Kolízne detekcie
    for (const obstacle of obstacles) {
        if (checkCollision(pouSphere, obstacle)) {
            console.log(`Kolízia s prekážkou na pozícii: x=${obstacle.position.x}, y=${obstacle.position.y}, z=${obstacle.position.z}`);
            endGame(gameState);
            showFinalScore();
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
