// rollingGame.js
import { gameState } from '../rollingGame/gameState.js';
import { createCamera } from '../rollingGame/rollingGameCreateCamera.js';
import { createRenderer } from '../rollingGame/rollingGameCreateRenderer.js';
import { addObstacle } from '../rollingGame/rollingGameAddObstacle.js';
import { handleKeyDown, handleKeyUp } from '../rollingGame/rollingGameControls.js';
import { gameScore } from '../rollingGame/rollingGameScore.js';
import { createBoundaries } from '../rollingGame/rollingGameCreateBoundaries.js';
import { onWindowResize } from '../rollingGame/rollingGameOnWindowResize.js';
import { animate } from '../rollingGame/rollingGameAnimate.js';
import { addBackground } from '../rollingGame/rollingGameAddBackground.js';
import { addSunLight } from '../rollingGame/rollingGameAddSunLight.js';
import { setupLevel1 } from '../rollingGame/rollingGameLevels.js';
import { textures } from '../textureLoader.js'; // Import of preloaded textures

export let camera, renderer, controls, scene, pouSphere, obstacles = [];
let boundaries = [];
const movement = { a: false, d: false };
let speed = 0.1;
let autoMoveSpeed = 0.05;

export function createRollingGame(existingScene) {
    // Use the existing scene if provided, otherwise create a new one
    scene = existingScene || new THREE.Scene();

    // Remove any existing canvas from the game container
    const oldCanvas = document.querySelector('#game-container canvas');
    if (oldCanvas) oldCanvas.remove();

    // Initialize the camera and renderer
    camera = createCamera();
    renderer = createRenderer();
    document.getElementById('game-container').appendChild(renderer.domElement);

    // Set up orbit controls with damping and disable rotation
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableRotate = false;

    // Add a ground plane
    const geometryPlane = new THREE.PlaneGeometry(20, 1500);
    const materialPlane = new THREE.MeshStandardMaterial({ color: 0x747570 });
    const plane = new THREE.Mesh(geometryPlane, materialPlane);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;
    scene.add(plane);

    // Add the Pou sphere with a preloaded texture
    const geometrySphere = new THREE.SphereGeometry(1, 32, 32);
    const materialSphere = new THREE.MeshStandardMaterial({ map: textures.pou });
    pouSphere = new THREE.Mesh(geometrySphere, materialSphere);
    pouSphere.position.set(0, 1.5, 145);
    pouSphere.castShadow = true;
    scene.add(pouSphere);

    // Set up level 1
    setupLevel1(scene, obstacles);

    // Add sunlight and retrieve the light reference
    const { sunLight } = addSunLight(scene, renderer);

    // Create boundaries and add a background
    createBoundaries(scene, boundaries);
    addBackground(scene, textures.sky);

    // Set up event listeners for controls and resizing
    window.addEventListener('keydown', (e) => handleKeyDown(e, movement, gameState.isGameOver));
    window.addEventListener('keyup', (e) => handleKeyUp(e, movement, gameState.isGameOver));
    window.addEventListener('resize', () => onWindowResize(camera, renderer));

    // Start the animation loop
    animate(pouSphere, camera, controls, renderer, scene, obstacles, boundaries, movement, speed, autoMoveSpeed, gameScore, gameState, sunLight);
}