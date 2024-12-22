import { gameState } from '../rollingGame/gameState.js';
import { createCamera } from '../rollingGame/rollingGameCreateCamera.js';
import { createRenderer } from '../rollingGame/rollingGameCreateRenderer.js';
import { addObstacle } from '../rollingGame/rollingGameAddObstacle.js';
import { handleKeyDown, handleKeyUp } from '../rollingGame/rollingGameControls.js';
import { checkCollision } from '../rollingGame/rollingGameCheckCollision.js';
import { endGame } from '../rollingGame/rollingGameEndGame.js';
import { gameScore, updateScoreDisplay, showFinalScore } from '../rollingGame/rollingGameScore.js';
import { createBoundaries } from '../rollingGame/rollingGameCreateBoundaries.js';
import { isCollidingWithBoundary } from '../rollingGame/rollingGameCollisionCheck.js';

export let camera, renderer, controls, scene, pouSphere, obstacles = [];
let boundaries = [];
const movement = { a: false, d: false };
const speed = 0.1;
const autoMoveSpeed = 0.05;

export function createRollingGame(existingScene) {
    scene = existingScene || new THREE.Scene();

    const oldCanvas = document.querySelector('#game-container canvas');
    if (oldCanvas) oldCanvas.remove();

    camera = createCamera();
    renderer = createRenderer();

    document.getElementById('game-container').appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableRotate = false;

    const geometryPlane = new THREE.PlaneGeometry(20, 1500);
    const materialPlane = new THREE.MeshBasicMaterial({ color: 0x747570, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometryPlane, materialPlane);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    const geometrySphere = new THREE.SphereGeometry(1, 32, 32);
    const texturePou = new THREE.TextureLoader().load('texture/pou.png');
    const materialSphere = new THREE.MeshBasicMaterial({ map: texturePou });
    pouSphere = new THREE.Mesh(geometrySphere, materialSphere);
    pouSphere.position.set(0, 1, 145);
    scene.add(pouSphere);

    addObstacle(scene, obstacles, 0, 2.5, 100);
    addObstacle(scene, obstacles, 5, 2.5, 50);
    addObstacle(scene, obstacles, -5, 2.5, 20);

    // Pridanie osvetlenia
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Pridanie bariér na okrajoch
    createBoundaries(scene, boundaries);

    window.addEventListener('keydown', (e) => handleKeyDown(e, movement, gameState.isGameOver));
    window.addEventListener('keyup', (e) => handleKeyUp(e, movement, gameState.isGameOver));
    window.addEventListener('resize', onWindowResize);

    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    if (gameState.isGameOver) return;

    requestAnimationFrame(animate);

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
            endGame(gameState);
            showFinalScore();
            return;
        }
    }

    gameScore.value += autoMoveSpeed;
    updateScoreDisplay();

    renderer.render(scene, camera);
}
