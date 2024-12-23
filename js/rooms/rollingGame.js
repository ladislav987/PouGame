import { gameState } from '../rollingGame/gameState.js';
import { createCamera } from '../rollingGame/rollingGameCreateCamera.js';
import { createRenderer } from '../rollingGame/rollingGameCreateRenderer.js';
import { addObstacle } from '../rollingGame/rollingGameAddObstacle.js';
import { handleKeyDown, handleKeyUp } from '../rollingGame/rollingGameControls.js';
import { gameScore, updateScoreDisplay } from '../rollingGame/rollingGameScore.js';
import { createBoundaries } from '../rollingGame/rollingGameCreateBoundaries.js';
import { onWindowResize } from '../rollingGame/rollingGameOnWindowResize.js';
import { animate } from '../rollingGame/rollingGameAnimate.js';

export let camera, renderer, controls, scene, pouSphere, obstacles = [];
let boundaries = [];
const movement = { a: false, d: false };
let speed = 0.1;
let autoMoveSpeed = 0.05;

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
    pouSphere.position.set(0, 2, 145);
    scene.add(pouSphere);

    addObstacle(scene, obstacles, 0, 2.5, 100);
    addObstacle(scene, obstacles, 5, 2.5, 50);
    addObstacle(scene, obstacles, -5, 2.5, 20);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    createBoundaries(scene, boundaries);

    window.addEventListener('keydown', (e) => handleKeyDown(e, movement, gameState.isGameOver));
    window.addEventListener('keyup', (e) => handleKeyUp(e, movement, gameState.isGameOver));
    window.addEventListener('resize', () => onWindowResize(camera, renderer));

    animate(pouSphere, camera, controls, renderer, scene, obstacles, boundaries, movement, speed, autoMoveSpeed, gameScore, gameState);
}
