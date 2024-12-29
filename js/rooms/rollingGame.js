// rollingGame.js
import { gameState } from '../rollingGame/gameState.js';
import { createCamera } from '../rollingGame/rollingGameCreateCamera.js';
import { createRenderer } from '../rollingGame/rollingGameCreateRenderer.js';
import { handleKeyDown, handleKeyUp } from '../rollingGame/rollingGameControls.js';
import { gameScore } from '../rollingGame/rollingGameScore.js';
import { createBoundaries } from '../rollingGame/rollingGameCreateBoundaries.js';
import { onWindowResize } from '../rollingGame/rollingGameOnWindowResize.js';
import { animate } from '../rollingGame/rollingGameAnimate.js';
import { addBackground } from '../rollingGame/rollingGameAddBackground.js';
import { addSunLight } from '../rollingGame/rollingGameAddSunLight.js';
import { setupLevel1 } from '../rollingGame/rollingGameLevels.js';

export let camera, renderer, controls, scene, pouSphere, obstacles = [];
let boundaries = [];
const movement = { a: false, d: false };
let speed = 0.2;
let autoMoveSpeed = 0.18;

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
    const materialPlane = new THREE.MeshStandardMaterial({ color: 0x747570 });
    const plane = new THREE.Mesh(geometryPlane, materialPlane);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);

    const geometrySphere = new THREE.SphereGeometry(1, 32, 32);
    const texturePou = new THREE.TextureLoader().load('texture/pou2.png');
    const materialSphere = new THREE.MeshStandardMaterial({ map: texturePou });
    pouSphere = new THREE.Mesh(geometrySphere, materialSphere);
    pouSphere.position.set(0, 1.5, 145);
    pouSphere.castShadow = true;
    scene.add(pouSphere);

    setupLevel1(scene, obstacles); // Inicializácia levelu 1

    const { sunLight } = addSunLight(scene, renderer);

    createBoundaries(scene, boundaries);
    addBackground(scene, '../texture/sky.jpg');

    window.addEventListener('keydown', (e) => handleKeyDown(e, movement, gameState.isGameOver));
    window.addEventListener('keyup', (e) => handleKeyUp(e, movement, gameState.isGameOver));
    window.addEventListener('resize', () => onWindowResize(camera, renderer));

    animate(pouSphere, camera, controls, renderer, scene, obstacles, boundaries, movement, speed, autoMoveSpeed, gameScore, gameState, sunLight);
}